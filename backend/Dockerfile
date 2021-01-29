FROM node:lts-alpine3.10

ENV NODE_ENV development

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ./package*.json /app/

RUN npm cache clean --force && \
  npm prune && \
  npm install --no-optional && \
  npm i -g @nestjs/cli

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:dev"]
