#!/usr/bin/env sh

echo "Checking for dotenv..."

if [ ! -f "${PWD}/.env" ] && [ ! - z "$DATABASE_URL" ] && [ "NODE_ENV" == "development" ]; then
    echo 'You forgot to make a `.env` file'
    exit 1
fi

echo "Checking for presence of 'node_modules' folder and for correct writability of folder..."

if [[ ! -w ${PWD}/node_modules ]] | [[ ! -d ${PWD}/node_modules ]]; then
  echo "'node_modules' is not writable. Please fix the permissions on the directory to be writable on the host machine"
  chmod -R $USER $PWD/node_modules
fi

echo "Checking 'node_modules' permissions..."

for i in `find ${PWD}/node_modules -type d -user root`; do
  echo "$i is not controlled by the host machine. Please correct the file permissions of the folder."
  chown -R $USER $PWD/node_modules
done

echo "Checking if database directory is writable..."

if [ ! -w "${PWD}/db" ]; then
  echo "Database directory is not writeable. Please fix the permissions on the directory"
  exit 1
fi

echo "Checking database files/folders..."

if [ -f "${PWD}/db/dev.db" ] && [ "$(( $(date +"%s") - $(stat -c "%Y" ${PWD}/db/dev.db) ))" -gt "7200" ]; then
  echo 'Removing potentially stale database...'
  rm -f ./dev/db
fi

npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
npm run start:dev
