FROM bitnami/nginx

USER 0
RUN mkdir /appDir
COPY ./dist /appDir
ADD ./CD/app_server.conf /opt/bitnami/nginx/conf/server_blocks/app_server.conf
USER 1001

EXPOSE 18000
