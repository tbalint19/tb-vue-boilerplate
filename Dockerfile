FROM nginx
RUN mkdir /app
COPY ./dist /app
COPY CD/nginx.conf /etc/nginx/nginx.conf

EXPOSE 18000
