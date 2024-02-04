ARG BASE_IMAGE_TAG=latest
FROM project-matrix-builder:$BASE_IMAGE_TAG AS builder

COPY . .
RUN pnpm build


FROM project-matrix-runner:$BASE_IMAGE_TAG

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY ./server.js ./

EXPOSE 3000

CMD ["pnpm", "start"]