#!/bin/sh

npm ci --no-optional

ng serve --host "0.0.0.0" --disable-host-check --watch --live-reload

