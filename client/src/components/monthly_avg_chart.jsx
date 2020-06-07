// jshint esversion:8 
import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';


const MonthlyAvgChart = (props) => {
    const data = {
        x: 'x',
        xFormat: '%Y-%m-%d',
        columns: [
            ['x', `${props.year}-01-01`, `${props.year}-02-01`, `${props.year}-03-01`, `${props.year}-04-01`, `${props.year}-05-01`],
            ['x', `${props.year}01`, `${props.year}02`, `${props.year}03`, `${props.year}04`, `${props.year}05`],
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
        <p><strong>{`Monthly Average Chart ${props.year}`}</strong></p>
        <C3Chart axis={axis} data={data} />
        </div>
    );

};

export default MonthlyAvgChart;
