// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "../client/dist")));

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
