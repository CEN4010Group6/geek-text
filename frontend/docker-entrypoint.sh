#!/bin/sh

if [[ $NODE_ENV == 'development' ]]; then
  if ! diff -q ./package-lock.json /tmp/package-lock.json; then
    echo "Updating 'node_modules'"
    npm install --no-optional
  fi
fi

if [[ $NODE_ENV == 'development' ]]; then
  ng serve --host "0.0.0.0" --disable-host-check --watch --live-reload
else
  npm prune
  npm run build
fi
