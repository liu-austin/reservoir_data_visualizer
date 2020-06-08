// jshint esversion:8 
import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';


const MonthlyAvgChart = (props) => {
    const data = {
        x: 'x',
        xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
        columns: [
            // ['x'].concat(props.dates),
            // ['x'].concat(props.dates),
            ['x'].concat(props.dates),
            ['Daily Storage'].concat(props.data)
        ]
    };
    const axis = {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
                rotate: -90
            },
            label: 'Date'
    },
        y: {
            label: 'Reservoir storage, acre-feet'
        }
    };
    const zoom = {
        enabled: true
    }
    return (
        <div style={{textAlign: 'center'}}>
        <p><strong>{`Daily Reservoir Storage Chart ${props.year}`}</strong></p>
        <C3Chart axis={axis} data={data} zoom={zoom}/>
        </div>
    );

};

export default MonthlyAvgChart;
