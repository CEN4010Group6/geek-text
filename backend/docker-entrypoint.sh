#!/bin/sh

if [[ $NODE_ENV == 'development' ]]; then
  if ! diff -q ./package-lock.json /tmp/package-lock.json; then
    echo "Updating 'node_modules'"
    npm install --no-optional
  fi
  if [ "$(( $(date +"%s") - $(stat -c "%Y" ./dev.db) ))" -gt "7200" ]; then
    rm -f ./dev/db
  fi
fi

npm run generate

npm run migrate

if [[ $NODE_ENV == 'development' ]]; then
  npm run seed
  npm run start:dev
else
  npm prune
  npm run start:prod
fi
