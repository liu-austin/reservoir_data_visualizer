// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const clientPG = require('../db/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "../client/dist")));


app.get('/sites', (req, res) => {
    if (req.query.arr === 'NM') {
        clientPG.query(`select * from metadata where station_nm similar to '%(NM|N. MEX|N MEX|N.M.)'`, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(results);
            }
        });
    } else {
        clientPG.query(`select * from metadata where station_nm like '%${req.query.arr}'`, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(results);
            }
        });
    }
});

app.get('/storage/:id', (req, res) => {
    let siteNumber = Number(req.params.id);
    clientPG.query(`select * from daily_data where site_no = ${req.params.id}`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(results);
        }
    });
});

app.get('/locations', (req, res) => {
    clientPG.query(`select * from metadata`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(results);
        }
    });
});

app.get('/search/:search_term', (req, res) => {
    clientPG.query(`select * from metadata where station_nm ilike '%${req.params.search_term}%' limit 20`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(results);
        }
    });
});

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

