FROM nginx:mainline-alpine

ENV H5BP_VERSION 3.3.0

WORKDIR /tmp

RUN curl -L https://github.com/h5bp/server-configs-nginx/archive/${H5BP_VERSION}.tar.gz | tar xz && \
  mv server-configs-nginx-${H5BP_VERSION}/h5bp /etc/nginx/ && \
  mv server-configs-nginx-${H5BP_VERSION}/mime.types /etc/nginx/ && \
  rm -rf server-configs-nginx-${H5BP_VERSION}

WORKDIR /etc/nginx

COPY nginx.conf nginx.conf
COPY templates/geek-text.conf.template templates/geek-text.conf.template

RUN if [ "$ENV" == 'production' ]; then \
  sed -i 's/# include/include/g' templates/geek-text.conf.template; \
  sed -i 's/# proxy_cache_bypass/proxy_cache_bypass/g' template/geek-text.conf.template; \
  sed -i '/location ^~ \/sockjs-node\//,/}/d' template/geek-text.conf.template; \
fi && \
rm -f conf.d/default.conf
