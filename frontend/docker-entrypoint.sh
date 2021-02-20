#!/usr/bin/env sh

if [ ! -f .env ] && [ ! - z "$REST_API_ENTRYPOINT" ] && [ "NODE_ENV" == "development" ]; then
  echo 'You forgot to make a `.env` file'
  exit 1
fi

if [ ! -w "./node_modules" ]; then
  echo "`node_modules` is not writable. Please fix the permissions on the directory"
  exit 1
fi

npm run start:dev -- --host 0.0.0.0