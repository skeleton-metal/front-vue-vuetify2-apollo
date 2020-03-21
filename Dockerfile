FROM node:12.16.1-alpine3.9

RUN apk add bash

#Target Directory
WORKDIR /www
COPY . /www

#NPM Dependencies and BUILD
RUN npm install
RUN npm run build

#NGINX
RUN apk update
RUN apk add nginx
RUN mkdir -p /run/nginx
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
COPY nginx/nginx.conf /etc/nginx/nginx.conf

#RUN Daemon
CMD ["nginx", "-g", "daemon off;"]
