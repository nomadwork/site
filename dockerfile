FROM nginx:alpine

COPY ./dist/nomadwork /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

