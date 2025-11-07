const http = require('http');
const nodeapp = require('./nodeapp');

//const hostname = '127.0.0.1'; 
const port = 4000;

//App.js contains the code to process the http request and send the response
const server = http.createServer(nodeapp);

server.listen(port, () => { 
    console.log(`Server running at ${port}`); 
});
