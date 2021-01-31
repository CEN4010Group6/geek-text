FROM node:lts-alpine3.10

ENV NODE_ENV development

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli && \
  npm install --no-optional && \
  npm cache clean --force

COPY ./package-lock.json /tmp/package-lock.json

EXPOSE 4200

ENTRYPOINT ["./docker-entrypoint.sh"]
