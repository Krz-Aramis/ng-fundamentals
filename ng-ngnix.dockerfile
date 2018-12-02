FROM nginx:stable-alpine
# Ensure that there is nothing served from this host
RUN rm -rf /usr/share/nginx/html
# Here we copy the file that ensures that our requests are redirected to correct container.
COPY ./ngnix.conf /etc/nginx/nginx.conf
EXPOSE 80
