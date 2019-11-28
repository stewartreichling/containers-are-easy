# Builds the image based on the official lightweight Node.js 12 image
# See more images at https://hub.docker.com/_/node
FROM node:12-slim

# Creates an app directory and sets the working directory
WORKDIR /usr/src/app

# Copies app source code
COPY . /usr/src/app/

# Makes the container listen on port 8080
EXPOSE 8080

# Runs the app when running the image
CMD [ "node", "/usr/src/app/server.js" ]
