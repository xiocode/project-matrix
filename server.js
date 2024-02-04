const process = require("process");
const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const DatabaseAccessor = require("./database-accessor");
const { RapidServer } = require('@ruiapp/rapid-core');
const { createRapidRequestHandler } = require('@ruiapp/rapid-express');

const BUILD_DIR = path.join(process.cwd(), "build");

exports.startServer = async () => {
  const app = express();

  app.use(compression());

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");

  // Remix fingerprints its assets so we can cache forever.
  app.use(
    "/build",
    express.static("public/build", { immutable: true, maxAge: "1y" })
  );

  // Everything else (like favicon.ico) is cached for an hour. You may want to be
  // more aggressive with this caching.
  app.use(express.static("public", { maxAge: "1h" }));

  app.use(morgan("tiny"));

  const customizeAPI = process.env.CUSTOMIZE_SERVICE_URL || 'http://127.0.0.1:3001';
  app.use('/api/customize', createProxyMiddleware({ target: customizeAPI, changeOrigin: true, pathRewrite: {
    '^/api/customize': '/',
  }, }));

  const envFromProcess = process.env;
  const env = {
    get: (name, defaultValue = "") => {
      return envFromProcess[name] || defaultValue;
    }
  };

  const defaultJWTKey = "DyYR1em73ZR5s3rUV32ek3FCZBMxE0YMjuPCvpyQKn+MhCQwlwCiN+8ghgTYcoijtLhKX4G93DPxsJOIuf/ub5qRi0lx5AnHEYGQ8c2zpxJ873viF7marKQ7k5dtBU83f0Oki3aeugSeAfYbOzeK49+LopkgjDeQikgLMyC4JFo=";
  const rapidConfig = {
    dbHost: env.get("DATABASE_HOST", "127.0.0.1"),
    dbPort: parseInt(env.get("DATABASE_PORT"), 10) || 5432,
    dbName: env.get("DATABASE_NAME", "project_matrix"),
    dbUser: env.get("DATABASE_USERNAME", "postgres"),
    dbPassword: env.get("DATABASE_PASSWORD", "postgres"),
    dbDefaultSchema: env.get("DATABASE_DEFAULT_SCHEMA") || 'public',
    dbPoolMaxConnections: parseInt(env.get("DATABASE_POOL_MAX_CONNECTIONS"), 10) || 20,
    sessionCookieName: env.get("SESSION_COOKIE_NAME", "RAPID_SESSION"),
    jwtKey: env.get("JWT_KEY", defaultJWTKey),
    localFileStoragePath: env.get("LOCAL_FILE_STORAGE_PATH", "/data/rapid-data/local-storage"),
  };

  const databaseAccessor  = new DatabaseAccessor({
    host: rapidConfig.dbHost,
    port: rapidConfig.dbPort,
    database: rapidConfig.dbName,
    user: rapidConfig.dbUser,
    password: rapidConfig.dbPassword,
    maxConnections: rapidConfig.dbPoolMaxConnections,
  });

  const rapidServer = new RapidServer({
    databaseAccessor,
    databaseConfig: {
      dbHost: rapidConfig.dbHost,
      dbPort: rapidConfig.dbPort,
      dbName: rapidConfig.dbName,
      dbUser: rapidConfig.dbUser,
      dbPassword: rapidConfig.dbPassword,
      dbDefaultSchema: rapidConfig.dbDefaultSchema,
    },
    serverConfig: {
      sessionCookieName: rapidConfig.sessionCookieName,
      jwtKey: rapidConfig.jwtKey,
      localFileStoragePath: rapidConfig.localFileStoragePath,
    },
  });
  await rapidServer.start();

  const rapidRequestHandler = createRapidRequestHandler(rapidServer)
  app.use("/api", (req, res, next) => {
    rapidRequestHandler(req, res, next);
  });

  app.all(
    "*",
    process.env.NODE_ENV === "development"
      ? (req, res, next) => {
          purgeRequireCache();

          return createRequestHandler({
            build: require(BUILD_DIR),
            mode: process.env.NODE_ENV,
          })(req, res, next);
        }
      : createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })
  );
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}