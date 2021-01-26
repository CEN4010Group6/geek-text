FROM node:lts-alpine3.10

WORKDIR /app

COPY ./package*.json /app/

RUN npm cache clean --force && npm install -g @angular/cli && npm install && npm audit --fix

COPY . /app

EXPOSE 4200

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV development

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
