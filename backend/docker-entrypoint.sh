#!/bin/sh

if [[ $NODE_ENV == 'development' ]]; then
  if ! diff -q ./package-lock.json /tmp/package-lock.json; then
    echo "Updating 'node_modules'"
    npm install --no-optional
  fi
fi

npx prisma generate

npx prisma migrate deploy --preview-feature

if [[ $NODE_ENV == 'development' ]]; then
  npm run start:dev
else
  npm prune
  npm run start
fi
