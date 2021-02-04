FROM node:lts-alpine3.10

ENV NODE_ENV development

ENV PATH /app/node_modules/.bin:$PATH

ENV DATABASE_URL "file:/app/db/dev.db"

WORKDIR /app

COPY . .

RUN apk --no-cache --virtual build add python make g++ && \
  npm install -g @nestjs/cli node-gyp && \
  npm install --no-optional && \
  npm uninstall -g node-gyp && \
  npm cache clean --force

COPY ./package-lock.json /tmp/package-lock.json

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
