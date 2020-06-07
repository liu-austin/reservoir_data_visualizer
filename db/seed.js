// jshint esversion:8
const client = require('./index');
const path = require('path');

const seedDatabase = async () => {
    let filePath1 = path.join(__dirname, "./metadata.csv");
    let queryString1 = `COPY metadata from '${filePath1}' DELIMITER E'\t'`;
    let filePath2 = path.join(__dirname, "./daily_data.csv");
    let queryString2 = `COPY daily_data from '${filePath2}' DELIMITER E'\t'`;
    await client.query(queryString1, (err, results) => {
        if (err) console.log(err);
        if (results) console.log(results);
    });
    await client.query(queryString2, (err, results) => {
        if (err) console.log(err);
        if (results) console.log(results);
    });
};

seedDatabase();
