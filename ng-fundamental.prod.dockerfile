FROM node:8.14.0-slim as build-stage
LABEL Author="LSA"
ENV APP_MODE=production
ENV APP_PORT=4200
WORKDIR /var/www
# No need to delete dist/ node_modules/ and e2e because of the .dockerignore
# Do not test for these directories or the Docker build will fail.
# Speed up image build if files have not changed.
COPY package*.json ./
RUN npm install
# Get the rest of source code
COPY ./ ./
RUN npm run build --prod

FROM nginx:stable-alpine
COPY --from=build-stage /var/www/dist /usr/share/nginx/html
COPY ./ng-app.ngnix.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
