#!/usr/bin/env sh

echo "Checking for dotenv..."

if [ ! -f "${PWD}/.env" ] && [ ! - z "$REST_API_ENTRYPOINT" ] && [ "NODE_ENV" == "development" ]; then
  echo 'You forgot to make a `.env` file'
  exit 1
fi

echo "Checking for writability of 'node_modules' folder..."

if [ ! -w "${PWD}/node_modules" ]; then
  echo "'node_modules' is not writable. Please fix the permissions on the directory to be writeable on the host machine"
  exit 1
fi

npm run start:dev -- --host 0.0.0.0
