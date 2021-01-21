FROM node:lts-alpine3.10

WORKDIR /app

COPY ./package*.json /app/

RUN npm cache clean --force && npm install

COPY . /app

RUN npx tsc

EXPOSE 9000

ENV PATH /app/node_modules/.bin:$PATH

ENTRYPOINT ["npm", "run", "devel"]

