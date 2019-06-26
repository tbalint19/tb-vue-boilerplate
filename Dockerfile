FROM node:10
COPY ./ /app
WORKDIR /app

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY CD/nginx.conf /etc/nginx/nginx.confx

EXPOSE 8080 80
