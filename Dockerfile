FROM nginx

RUN chmod -R 777 /var
RUN chmod -R 777 /etc
RUN chmod -R 777 /usr

RUN mkdir /app
RUN chmod -R 777 /app
COPY ./dist /app
COPY CD/nginx.conf /etc/nginx/nginx.conf

EXPOSE 18000
