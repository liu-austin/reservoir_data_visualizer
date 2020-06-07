// jshint esversion:8
const { Client } = require('pg');

const client = new Client({
    database: 'reservoir_data'
});

client.connect().then(() => {
    console.log(`PostgreSQL connection created on port 5432`);
}).catch(err => console.log(err));

module.exports = client;