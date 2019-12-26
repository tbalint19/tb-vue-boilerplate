# FROM repository.vodafone.hu/docker-vodafone/voda-rhel7-nginx114-base:latest
# # FROM bitnami/nginx:latest
# #
# # USER 0
# # RUN mkdir /appDir
# # COPY ./dist /appDir
# # ADD ./app_server.conf /opt/bitnami/nginx/conf/server_blocks/app_server.conf
# # USER 1001
# #
# # EXPOSE 18000
#
# COPY /dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]




# REAL WORLD EXAMPLE

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
# COPY package*.json ./
# RUN npm install
COPY ./ .
# RUN npm run build

# RUN npm run build locally!!

# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
