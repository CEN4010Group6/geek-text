#!/bin/sh

if [ ! -f .env ] && [ ! - z "$DATABASE_URL" ] && [ "NODE_ENV" == "development" ]; then
    echo 'You forgot to make a `.env` file'
    exit 1
fi

if [ ! -w "./db" ]; then
  echo "Database directory is not writeable. Please fix the permissions on the directory"
  exit 1
fi

if [ ! -d "./node_modules" ]; then
  echo "Installing `node_modules`..."
  npm ci
fi

if [ ! -w "./node_modules" ]; then
  echo "`node_modules` is not writable. Please fix the permissions on the directory"
  exit 1
fi

for i in `find node_modules -type d -user root`; do
  echo "$i is not controlled by the host machine. Please reinstall `node_modules`.\n"
  exit 1
done

if [ -f ./db/dev.db ] && [ "$(( $(date +"%s") - $(stat -c "%Y" ./db/dev.db) ))" -gt "7200" ]; then
  echo 'Removing potentially stale database...'
  rm -f ./dev/db
fi

npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
npm run start:dev
