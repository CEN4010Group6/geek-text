#!/bin/sh

if [[ $NODE_ENV == 'development' ]]; then
  if ! diff -q ./package-lock.json /tmp/package-lock.json; then
    echo "Updating 'node_modules'"
    npm install --no-optional
  fi
  rm -f ./db/dev.db
fi

npx prisma generate

npm run migrate

if [[ $NODE_ENV == 'development' ]]; then
  npm run seed
  npm run start:dev
else
  npm prune
  npm run start
fi
