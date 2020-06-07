// jshint esversion:8
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const client = require('./index');

const writeToMetadata = async() => {
    let results1 = await axios.get(`https://waterservices.usgs.gov/nwis/site/?format=rdb&stateCd=az&parameterCd=00054&siteStatus=active`);
    let results2 = await axios.get(`https://waterservices.usgs.gov/nwis/site/?format=rdb&stateCd=ca&parameterCd=00054&siteStatus=active`);
    let results3 = await axios.get(`https://waterservices.usgs.gov/nwis/site/?format=rdb&stateCd=nm&parameterCd=00054&siteStatus=active`);
    let results = results1.data + results2.data + results3.data;
    await fs.writeFile(path.join(__dirname, './metadata.txt'), results, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Metadata saved to txt file.');
        }
    });
    // const fileStream = fs.createReadStream(path.join(__dirname, './metadata.txt'));
    // const rl = readline.createInterface({
    //     input: fileStream,
    //     crlfDelay: Infinity
    // });

    // for await (const line of rl) {
    //     if (line.startsWith('USGS')) {
    //         console.log(line)
    //         // let queryString = `COPY metadata from '${line}' DELIMITER E'\t'`;
    //         // client.query(queryString, (err, results) => {
    //         //     if (err) console.log(err);
    //         //     // if (results) console.log(results);
    //         // });
    //     }
    // }
};

const writeToDailyData = async() => {
    let results1 = await axios.get(`https://waterservices.usgs.gov/nwis/dv/?format=rdb&stateCd=nm&startDT=2020-01-01&endDT=2020-06-01&parameterCd=00054&siteStatus=active`);
    let results2 = await axios.get(`https://waterservices.usgs.gov/nwis/dv/?format=rdb&stateCd=nm&startDT=2020-01-01&endDT=2020-06-01&parameterCd=00054&siteStatus=active`);
    let results3 = await axios.get(`https://waterservices.usgs.gov/nwis/dv/?format=rdb&stateCd=nm&startDT=2020-01-01&endDT=2020-06-01&parameterCd=00054&siteStatus=active`);
    let results = results1.data + results2.data + results3.data;
    await fs.writeFile(path.join(__dirname, './daily_data.txt'), results, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Daily data saved to txt file.');
        }
    });
    // const fileStream = fs.createReadStream(path.join(__dirname, './daily_data.txt'));
    // const rl = readline.createInterface({
    //     input: fileStream,
    //     crlfDelay: Infinity
    // });

    // for await (const line of rl) {
    //     if (line.startsWith('USGS')) {
    //         console.log(line)
    //         // client.query(queryString, (err, results) => {
    //         //     let queryString = `COPY metadata from '${line}' DELIMITER E'\t'`;
    //         //     if (err) console.log(err);
    //         //     // if (results) console.log(results);
    //         // });
    //     }
    // }
};

writeToMetadata();
writeToDailyData();