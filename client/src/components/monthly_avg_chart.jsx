// jshint esversion:8 
import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';


const MonthlyAvgChart = (props) => {
    const data = {
        x: 'x',
        xFormat: '%Y-%m-%d',
        columns: [
            ['x', '2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', '2020-05-01'],
            ['x', '202001', '202002', '202003', '202004', '202005'],
            ['Monthly Average'].concat(props.data)
        ]
    };
    const axis = {
        x: {
            label: 'Month'
        },
        y: {
            label: '99604_00054_32400'
        },
        type: 'timeseries',
        tick: {
            format: '%Y-%m-%d'
        }
    }
    return (
        <div style={{textAlign: 'center'}}>
        <p><strong>Monthly Average Chart 2020</strong></p>
        <C3Chart axis={axis} data={data} />
        </div>
    );

};

export default MonthlyAvgChart;
