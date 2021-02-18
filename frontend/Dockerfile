FROM node:lts-alpine3.10

ENV NODE_ENV development
ENV REST_API_ENDPOINT /api
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli && \
  npm install --no-optional && \
  npm cache clean --force

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--watch", "--live-reload"]
