# NG-Fundamentals - Project notes

## TODO

1. Change the `.env` file so that the cluster is served from 80 by default.
2. Fix the `docker-compose.yml` file so that it uses `links` instead of defining uselessly an external network.
3. Record, somehow, that it is also possible to re-write calls to `/api`. At time of writing, we are using `proxy_pass`. It might be useful to capture a working example of re-writing too!
4. Investigate how to debug the requests that should flow between the front-end gateway and the `nfg-serever` container.
5. Instead of planning for `ngf-server` to be a `git submodule`, modify the compose file instead to make reference to the Github repostiry.

## Getting Started

This project currently requires the following:

1. On Windows, install NVM manager.
2. Ensure that Node version 8.11.2 is installed through nvm.
3. Use the command `nvm use 8.11.2` to switch to this version of Node.
4. This code for this application stems from the work on the Pluralsight course _Getting Started With Angular_ which assumes that the Angular version is 6.0.8, thus we need to install this version of Angular using the command `npm install -s @angular/cli@6.0.8`.
5. For reasons unknown, it might be necessary to forceably install `ngf-bootstrap` despite the fact that, it is already listed in the `package.json`. It would appear that `npm` is not installing all the sub-dependencies.

## Dockerising Notes

1. Need to learn how to tag images using the short SHA commit from GIT. There might the beginning of an answer here on [Reddit](https://www.reddit.com/r/docker/comments/7kzjyz/is_there_a_way_to_tag_docker_image_builds_with/). Alternatively, spy the trick on the [CodeFresh video on Helm](https://www.youtube.com/watch?v=Jj1Ueq_Lz6A). Although, I must admit, it looks like their own capabilities as each of the commands start with `CF_`.
2. It might be **wiser** to create higher level python scripts to perform the builds. From the video on Pluralsight, it seems that one cannot tag images in the docker file. Along with this, it might be easier to maintain and track the various options in Environment files. Thus, a Python build script might read the various option depending on our needs, such as placing the commit SHA into an environmental variable.
3. In the example below, we need to identify the commands that can be added to our existing working configuration for, say, greater speed and/or stability.

```config
worker_processes  1;
upstream api_node {
    server    ngf_server:8808;
}
events {
    worker_connections  1024;
}
http {
    server {
        listen 4200;
        server_name  localhost;
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        include /etc/nginx/mime.types;
        gzip on;
        gzip_min_length 1000;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

    location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        rewrite ^/api/?(.*) /$1 break;

        proxy_pass http://api_node;
        proxy_redirect  http://api_node/ /api;
    }
}
```

## API server Docker container

This now exists at the following URL on [GitHub](https://github.com/Krz-Aramis/ngf-server). Therefore as it has not been published on DockerHub yet, the process is to clone the repository on the local machine and build the container and tag it as `ngf-server` so that it can be re-used during the `docker-compose` build. Perhaps, we should link this work through git-submodules.

## Development server

Always start the `ngf-server` application first so that the data required can be served and users can login. The following command assumes that `ngf-server` has been installed as development dependencies on the local host.

```console
npm run server
```

The above will start a server on `http://localhost:8808`. It is important to remember that this will also serve any content in the local `dist` folder. Therefore, builds from our app can be serve with this method.

In development mode, we can start the application using: `npm start`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
