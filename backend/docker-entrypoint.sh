#!/bin/sh

if [! -f .env ]; then
  if [ ! -z "$DATABASE_URL" ] && [ "$NODE_ENV" == "development" ]; then
    echo 'You forgot to make a `.env` file'
    exit 1
  fi
fi

if [ -f ./db/dev.db ]; then
  if [ "$(( $(date +"%s") - $(stat -c "%Y" ./db/dev.db) ))" -gt "7200" ]; then
    rm -f ./dev/db
  fi
fi

npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
npm run start:dev
