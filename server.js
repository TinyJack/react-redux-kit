const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, './dist')));
app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
	app.use(require('morgan')('dev'));
}

server.listen(port);