FROM node:18.18.0-alpine as stage
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

ENV NODE_ENV production
WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install


FROM node:18.18.0-alpine
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

ENV NODE_ENV production
WORKDIR /app
COPY --from=stage /app ./