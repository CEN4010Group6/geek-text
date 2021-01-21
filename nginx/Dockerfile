FROM nginx:mainline-alpine

WORKDIR /etc/nginx

COPY ./h5bp/ ./h5bp/
COPY mime.types .
COPY backend-devel.conf ./conf.d/
COPY frontend-devel.conf ./conf.d/
