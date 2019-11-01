FROM node:12 AS build

  # Create app directory
WORKDIR /var/www/app

  # Install app dependencies
  # A wildcard is used to ensure both package.json AND package-lock.json are copied
  # where available (npm@5+)
COPY . /var/www/app
RUN npm install
  # If you are building your code for production
  # RUN npm ci --only=production
RUN npm run build

FROM nginx:1.17 as production-stage

COPY --from=build  /var/www/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]