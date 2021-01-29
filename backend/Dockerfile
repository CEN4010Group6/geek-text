FROM node:lts-alpine3.10

ENV NODE_ENV development

ENV npm_config_loglevel error

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ./package*.json /app/

RUN npm cache clean --force && \
  npm prune && \
  npm install && \
  npm i -g @nestjs/cli

COPY . .

RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:dev"]
