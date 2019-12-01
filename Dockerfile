FROM repository.vodafone.hu/docker-vodafone/voda-rhel7-nginx114-base:latest
# FROM bitnami/nginx:latest
#
# USER 0
# RUN mkdir /appDir
# COPY ./dist /appDir
# ADD ./app_server.conf /opt/bitnami/nginx/conf/server_blocks/app_server.conf
# USER 1001
#
# EXPOSE 18000

COPY /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
