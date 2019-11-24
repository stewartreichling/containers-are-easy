# Containers Are Easy
A quick tutorial to help you get started with containers.

By the end of this tutorial, you will have built an image from a small Node.js
app and run that image as a container using Docker's `docker` command. While
this tutorial uses a Node.js web app, you don't need to know any Node.js to
understand this tutorial.

## Pre-requisites

* We'll use [docker](https://www.docker.com/) to build an image for our app.
  After that, we'll use docker to run that image in a container.
  
* We'll use [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  to get example code. 

Before you get started, set both of these up on your development machine and
make sure the `docker` daemon is running.

## Tutorial

Open a shell on your development machine. I use [iTerm2](https://iterm2.com/)
on my Mac.

### Get the app code and files needed to build your image

Get the app source from this repository:

```bash
git clone https://github.com/stewartreichling/containers-are-easy.git
```

Navigate to the newly-downloaded directory:

```bash
cd containers-are-easy
cd src
ls -a
#output: .dockerignore  Dockerfile  package-lock.json  package.json  server.js
```

The directory contains five files:

* `Dockerfile` contains instructions used by `docker` to build an image of your app.
* `.dockerignore` tells `docker` to skip certain files ([learn more](https://docs.docker.com/engine/reference/builder/#dockerignore-file))
  when building your app.
* `server.js`, `package.json` and `package-lock.json` are the files which
  constitute your app.

### Build the image

Use the `docker build` command to create an image of your app: 

```bash
docker build -t node-web-app-image .
```

The `-t` ("tag") flag names your image `node-web-app-image`. This is handy for
identifying and running your image in the following steps.

The `docker build` command follows the steps specified in the `Dockerfile` to
create an image. At a high level, these steps specify:

* the base image, which is the starting point for your app's image
  (`FROM node:12-slim`). In this case, your final image will contain your app
  as well as everything in the `node:12-slim` image.
* the directory where your app will live on the image (`WORKDIR /usr/src/app`).
* the port on which the container listens when running the image
  (`EXPOSE 8080`).
* the command which runs when the container starts the image 
  (`CMD [ "node", "server.js" ]`). In this case, this starts our Node.js app.

### Run the image in a container

Use the `docker run` command to create a container which runs your image:

```bash
docker run -p 127.0.0.1:8080:8080 -d --name node-web-app-container node-web-app-image
```

The `docker run` command will:

* start a container named `node-web-app-image` that runs your image (`node-web-app-image`)
* make that container accesible on `127.0.0.1:8080` on your development machine.

The flags used in this example are:

* `-p` ("publish") maps the container's port (`8080`) to the machine on which
  the container is running (`127.0.0.1:8080`).
* `-d` ("detached") runs the container in the background.
* `--name` specifies the container name (`node-web-app-container`). Note that
  this is not the same as the image name.
* The final argument is the image name (`node-web-app-image`).

### Test the app

Now that the container is running at `127.0.0.1:8080`, test that it's working.
You can do this by visiting `127.0.0.1:8080` in a browser or using a tool like `curl`:

```bash
curl 127.0.0.1:8080
# output: Hello, World!
```

### Clean up your container

Now that you've verified that your app is working, it's time to stop your
container and clean up.

Clean up your container using `docker rm`:

```bash
docker rm -f node-web-app-container
```

The `-f` ("force") flag removes a running container even if it still running.
This shortcut is useful for a simple app like this one but you may want to use
`docker stop` and `docker rm` (without `-f`) if your app needs to do additional
cleanup before it is terminated.

## Conclusion

That's it, you're done!

## Additional reading

This was just a first step in mastering containers. Here's additional material
to help you build production-ready containerized applications using a
streamlined local development flow.

* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
  was one of the starting points for this tutorial.
* [Production-ready Docker images](https://pythonspeed.com/docker/) contains
  advanced tips to make your images more reproducible, secure and performant.
* [Get started with Docker Compose](https://docs.docker.com/compose/gettingstarted/)
  walks you through an example that streamlines the container-based local
  development flow using `docker-compose`.