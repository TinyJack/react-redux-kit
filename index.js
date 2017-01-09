const express = require('express');
const path = require('path');
const http = require('http');

/** def: public */
const __public = './dist';

/** def: port */
const port = process.env.PORT || 5000;

/** def: express application */
const app = express();

/* def: middlewares */
app.use(express.static(path.join(__dirname, __public)));

/** def: router */
app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, __public, 'index.html'));
});

/** def: server */
const server = http.createServer(app);

/** start: server */
server.listen(port);
