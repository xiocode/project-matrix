let env: Record<string, any> = {};

declare const window: Window & {
  ENV: Record<string, any>;
};

if (typeof window !== "undefined" && window.ENV) {
  env = window.ENV;
}

export default {
  apiBase: env.BACKEND_URL ? `${env.BACKEND_URL}/api` : "http://localhost:3000/api",
};
