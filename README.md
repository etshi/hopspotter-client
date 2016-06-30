# hopspotter Clients onBoarding

GUI to onboard Clients (CRUD):

- Onboard Client vacations

## Quick start

1. Install [node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/)
> e.g. in OS X with [homebrew](http://brew.sh/): `brew install node`
2. Clone the repository
3. Install dependencies with `npm install`
4. Copy `src/config/development.json.example` to `src/config/development.json`. The defaults should work for you.  
5. Start the development server `npm start` will build the frontend dependencies, serve the static asssets and proxy requests to the API(as defined in gulp `config.js`)


### Contributing

To be able to run this application locally we need one extra step after making the build.

So far our API endpoints doesn't support **Cross-origin resource sharing** _(CORS)_. Request from the browser have to belong to the same domain of the API.  For that we need to enable some proxy to make request from client side work on the same domain as the API.

#### Setup proxy with [NGINX](http://nginx.org/) in OS X

1. Install with homebrew: `brew install nginx`
2. Replace `/usr/local/etc/nginx/nginx.conf` with this basic one:
```
worker_processes  1;
error_log   /usr/local/etc/nginx/logs/error.log;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /usr/local/etc/nginx/logs/access.log  main;
    sendfile        on;
    keepalive_timeout  65;
    index index.html;
    include servers/*.conf;
}
```
3. Add `optiopay.conf` to your `/usr/local/etc/nginx/servers/`
```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
server {
    listen      80;
    server_name optiopay.local;
    error_log   /usr/local/etc/nginx/logs/error.optiopay.log;
    location / {
        proxy_pass http://localhost:3000;
    }
    location "/v1" {
        proxy_pass http://host-to-development-API;
    }
    # BrowserSync websocket
    location /browser-sync/socket.io/ {
        proxy_pass http://localhost:3000/browser-sync/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```
4. Then start / stop nginx with: `sudo nginx` / `sudo nginx -s stop`
5. Add this line to your hosts file:
```
127.0.0.1       optiopay.local
```
#### Setup proxy with [NGINX](http://nginx.org/) in Linux

1. Install with homebrew: `apt-get install nginx`
2. Replace `/etc/nginx/nginx.conf` with this basic one:
```
worker_processes  1;
error_log   /var/log/nginx/error.log;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    keepalive_timeout  65;
    index index.html;
    include servers/*.conf;
}
```
3. Add `optiopay.conf` to your `/etc/nginx/servers/`
```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
server {
    listen      80;
    server_name optiopay.local;
    error_log   /var/log/nginx/error.optiopay.log;
    location / {
        proxy_pass http://localhost:3000;
    }
    location "/v1" {
        proxy_pass http://host-to-development-API;
    }
    # BrowserSync websocket
    location /browser-sync/socket.io/ {
        proxy_pass http://localhost:3000/browser-sync/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```
4. Then start / stop nginx with: `sudo service nginx restart`
5. Add this line to your hosts file:
```
127.0.0.1       optiopay.local
```

#### Running locally

Once we have setup the proxy, you can run the application locally:

- To run the application in development mode  `gulp dev`
- Go to `localhost:3000` in your browser and you should see the app.

#### Deployment

There is a gulp `release` task where we can specify any task that must be run to do a deployment.
This task is called on [postinstall](https://docs.npmjs.com/misc/scripts) after `npm install`.
To run just the `postinstall` script, type `npm run postinstall`

## API

We have three parameters we can use to tell gulp how do we want to build the application:

- `--env envitonment_name` will merge the configuration file from `./src/config/` to the _general_ configuration file `./src/config/config.json`
- `--dest path/to/build/folder` indicate the _destination_ folder for the application build.

For example:

```
gulp build --env staging --dest staging
```
This command will build the **recipient-frontend** using the configuration resulting from merging `./src/config/config.json` + `./src/config/staging.json`. And the result of this build will be in `./staging` folder.

## Tests

Run tests with `npm test`

## Build Docker artifact

#### Get [docker builder](https://github.com/optiopay/sandbox/tree/master/npm-builder)
~~~bash
docker pull docker-registry.optiopay.com/npm-builder:latest
~~~

#### Build [artifact](https://docs.docker.com/engine/userguide/dockerimages/) and tag with a label `your-image:latest`
~~~bash
docker run --rm --volume $(pwd):/src -v /var/run/docker.sock:/var/run/docker.sock npm-builder your-image:latest
~~~

### Run locally on port `8081`
~~~bash
docker run --rm --publish 8081:80 --env ASSETS_DOMAIN=your-assets-subdomain.optipay.com your-image:latest
~~~

#### Connect to container
* OSX with [boot2docker](http://boot2docker.io/):
~~~bash
curl http://$(boot2docker ip):8081/
~~~

## License
