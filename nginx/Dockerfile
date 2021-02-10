FROM nginx:mainline-alpine

WORKDIR /etc/nginx

COPY h5bp/ h5bp/
COPY mime.types mime.types
COPY nginx.conf nginx.conf
COPY templates/geek-text-devel.conf.template templates/geek-text.conf.template
