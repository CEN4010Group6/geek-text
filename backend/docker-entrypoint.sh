#!/bin/sh

if [ "$(( $(date +"%s") - $(stat -c "%Y" ./db/dev.db) ))" -gt "7200" ]; then
  rm -f ./dev/db
fi

npm ci
npm run prisma:generate
npm run prisma:migrate
npm run primsa:seed
npm run start:dev
