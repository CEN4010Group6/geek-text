#!/bin/sh

if [ -f ./db/dev.db ]; then
  if [ "$(( $(date +"%s") - $(stat -c "%Y" ./db/dev.db) ))" -gt "7200" ]; then
    rm -f ./dev/db
  fi
fi

npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
npm run start:dev
