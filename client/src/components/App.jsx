// jshint esversion:6
import React from "react";
import axios from "axios";
import MonthlyAvgChart from './monthly_avg_chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "",
      site: null,
      sites: [],
      reservoir_data: [],
      monthlyAvg: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectSite = this.selectSite.bind(this);
  }

  handleChange(e) {

    this.setState({ selectedState: e.target.value }, () => {

      axios
      .get(`/sites`, {
        params: {
            arr: this.state.selectedState
        }
      })
      .then(res => this.setState({sites: res.data.rows}));
    });
  }

  selectSite(e) {
    this.setState({site: e.target.value}, () => {
        axios.get(`/storage/${this.state.site}`).then(results => {
            // console.log(results.data.rows);
            this.setState({reservoir_data: results.data.rows}, () => {
                if (this.state.reservoir_data.length) {
                        let monthlyTotal = {
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0
                        }
                        let monthlyNum = {
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0
                        }
                    this.state.reservoir_data.map((datum) => {
                        monthlyTotal[datum.date_time[6]] += Number(datum.data_val);
                        monthlyNum[datum.date_time[6]] += 1;
                    });
                    console.log(monthlyTotal, monthlyNum)
                    let avg = [];
                    for (let i = 1; i < 6; i++) {
                        avg.push(monthlyTotal[i] / monthlyNum[i]);
                    }
                    this.setState({monthlyAvg: avg}, () => {
                        console.log(this.state.monthlyAvg);
                    });
                } 
            });
        });
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="main">
        <p>
          <strong>Reservoir Data Visualizer</strong>
        </p>
        <div className="first-dropdown">
          <p>
            <strong>Option 1</strong>
          </p>
          <select value={this.state.selectedState} onChange={this.handleChange}>
            <option value=""></option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="NV">NV</option>
            <option value="NM">NM</option>
          </select>
          <select value={this.state.site ? this.state.site.station_nm : ''} onChange={this.selectSite}>
          {
            this.state.sites.length ? 
            (
                this.state.sites.map((site, i) => {
                    return (
                        <option value={site.site_no}>{site.station_nm}</option>
                    )
                })
            ) 
            : 
            (
                null
            )
          }
        </select>
        </div>
        <MonthlyAvgChart data={this.state.monthlyAvg}/>
      </div>
    );
  }
}

export default App;
