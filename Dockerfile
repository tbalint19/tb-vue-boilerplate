FROM nginx

RUN mkdir /app
COPY ./dist /app
COPY CD/nginx.conf /etc/nginx/nginx.conf

EXPOSE 18000

USER root
ENTRYPOINT ["nginx -c /etc/nginx/nginx.conf"]
