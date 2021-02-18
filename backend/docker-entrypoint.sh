#!/bin/sh

if [ -f ./db/dev.db && "$(( $(date +"%s") - $(stat -c "%Y" ./db/dev.db) ))" -gt "7200" ]; then
  rm -f ./dev/db
fi

npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
npm run start:dev
