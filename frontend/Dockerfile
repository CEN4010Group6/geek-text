FROM node:lts-alpine3.10

ENV NODE_ENV development

ENV npm_config_loglevel error

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ./package*.json /app/

RUN npm cache clean --force && \
  npm prune && \
  npm install && \
  npm install -g @angular/cli && \
  npm audit --fix

COPY . .

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
