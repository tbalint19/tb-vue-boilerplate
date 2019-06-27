FROM nginx

RUN setenforce 0

RUN mkdir /app
COPY ./dist /app
COPY CD/nginx.conf /etc/nginx/nginx.conf

RUN setenforce 0

EXPOSE 18000
