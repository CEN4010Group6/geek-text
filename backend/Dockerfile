FROM node:lts-alpine3.10

ENV NODE_ENV development

ENV PATH /app/node_modules/.bin:$PATH

ENV DATABASE_URL "file:/app/db/dev.db"

WORKDIR /app

COPY . .

RUN npm install -g @nestjs/cli && \
  npm install --no-optional && \
  npm cache clean --force

COPY ./package-lock.json /tmp/package-lock.json

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
