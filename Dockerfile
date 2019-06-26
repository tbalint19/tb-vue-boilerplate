FROM nginx
RUN mkdir /app
COPY ./dist /app
COPY CD/nginx.conf /etc/nginx/nginx.confx

EXPOSE 80
