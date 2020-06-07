// jshint esversion:8
import React from 'react';

const DataChart = (props) => {
    return (
        <table align="center">
        <thead>
        <tr>
        <th colspan="4">Reservoir storage, acre-feet</th>
    </tr>
        </thead>
            <thead>
                <tr>
                    <th></th>
                    <th>2018</th>
                    <th>2019</th>
                    <th>2020</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Jan</td><td>{props.data2018.length ? props.data2018[0] : ''}</td><td>{props.data2019.length ? props.data2019[0] : ''}</td><td>{props.data2020.length ? props.data2020[0] : ''}</td></tr>
                <tr><td>Feb</td><td>{props.data2018.length ? props.data2018[1] : ''}</td><td>{props.data2019.length ? props.data2019[1] : ''}</td><td>{props.data2020.length ? props.data2020[1] : ''}</td></tr>
                <tr><td>Mar</td><td>{props.data2018.length ? props.data2018[2] : ''}</td><td>{props.data2019.length ? props.data2019[2] : ''}</td><td>{props.data2020.length ? props.data2020[2] : ''}</td></tr>
                <tr><td>Apr</td><td>{props.data2018.length ? props.data2018[3] : ''}</td><td>{props.data2019.length ? props.data2019[3] : ''}</td><td>{props.data2020.length ? props.data2020[3] : ''}</td></tr>
                <tr><td>May</td><td>{props.data2018.length ? props.data2018[4] : ''}</td><td>{props.data2019.length ? props.data2019[4] : ''}</td><td>{props.data2020.length ? props.data2020[4] : ''}</td></tr>
            </tbody>
        </table>
    )
};

export default DataChart;