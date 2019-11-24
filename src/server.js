const http = require('http');
const port = 8080;

// Instantiates a server that returns a "Hello, World!" in response
const server = http.createServer(function(req, res) {
  res.end('Hello, World!');
});

// Starts the server and listens on a port.
server.listen(port, (err) => {
  if (err) {
    return console.log('Failed to start server.', err);
  }

  console.log(`Server listening on ${port}...`);
})