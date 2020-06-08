// jshint esversion:6
import React from "react";
import axios from "axios";
import MonthlyAvgChart from './monthly_avg_chart.jsx';
import MarkedMap from './marked_map.jsx';
import SearchResults from './search_results.jsx';
import DataChart from './data_chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "",
      site: null,
      sites: [],
      reservoir_data: [],
      reservoir_locations: [],
      monthlyAvg2020: [],
      monthlyAvg2019: [],
      monthlyAvg2018: [],
      search_term: '',
      search_results: [],
      dailyData: {2018: [], 2019: [], 2020: []},
      dailyDate: {2018: [], 2019: [], 2020: []}
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectSite = this.selectSite.bind(this);
    this.fetchStorageData = this.fetchStorageData.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
  }

  clearSearchResults() {
      this.setState({search_results: []});
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

  selectMarker(siteInfo) {
    this.setState({site: siteInfo}, () => {
        this.fetchStorageData();
    });
  }

  fetchStorageData() {
    axios.get(`/storage/${this.state.site}`).then(results => {
        this.setState({reservoir_data: results.data.rows}, () => {
            if (this.state.reservoir_data.length) {
              let dailyData = {
                2018: [],
                2019: [],
                2020: []
              };
              let dailyDate = {
                2018: [],
                2019: [],
                2020: []
              };
                    let monthlyTotal2020 = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0
                    };
                    let monthlyNum2020 = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0
                    };
                    let monthlyTotal2019 = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0
                    };
                    let monthlyNum2019 = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0
                    };
                    let monthlyTotal2018 = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0
                    };
                    let monthlyNum2018 = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0
                    };
                this.state.reservoir_data.map((datum) => {
                  if (datum.date_time.slice(0,4) === '2020') {
                    dailyData[2020].push(Number(datum.data_val));
                    dailyDate[2020].push(datum.date_time);
                  } else if (datum.date_time.slice(0,4) === '2019') {
                    dailyData[2019].push(Number(datum.data_val));
                    dailyDate[2019].push(datum.date_time);
                  } else if (datum.date_time.slice(0,4) === '2018') {
                    dailyData[2018].push(Number(datum.data_val));
                    dailyDate[2018].push(datum.date_time);
                  }

                    if (datum.date_time.slice(0,4) === '2020') {
                        monthlyTotal2020[datum.date_time[6]] += Number(datum.data_val);
                        monthlyNum2020[datum.date_time[6]] += 1;
                    } else if (datum.date_time.slice(0,4) === '2019') {
                        monthlyTotal2019[datum.date_time[6]] += Number(datum.data_val);
                        monthlyNum2019[datum.date_time[6]] += 1;
                    } else if (datum.date_time.slice(0,4) === '2018') {
                        monthlyTotal2018[datum.date_time[6]] += Number(datum.data_val);
                        monthlyNum2018[datum.date_time[6]] += 1;
                    }
                });
                let avg2020 = [];
                let avg2019 = [];
                let avg2018 = [];
                for (let i = 1; i < 6; i++) {
                    avg2020.push(monthlyTotal2020[i] / monthlyNum2020[i]);
                    avg2019.push(monthlyTotal2019[i] / monthlyNum2019[i]);
                    avg2018.push(monthlyTotal2018[i] / monthlyNum2018[i]);
                }
                this.setState({monthlyAvg2020: avg2020, monthlyAvg2019: avg2019, monthlyAvg2018: avg2018, dailyData: dailyData, dailyDate: dailyDate});
            } else {
                this.setState({monthlyAvg2020: [], monthlyAvg2019: [], monthlyAvg2018: [], dailyData: {2018: [], 2019: [], 2020: []}, dailyDate: {2018: [], 2019: [], 2020: []}});
            }
        });
    });
  }

  handleSearchChange(e) {
      this.setState({search_term: e.target.value}, () => {
        if (this.state.search_term !== '') {
            axios.get(`/search/${this.state.search_term}`).then(results => this.setState({search_results: results.data.rows}, () => {
                console.log(this.state.search_results);
            }));
        }
      });
  }

  selectSite(e) {
    this.setState({site: e.target.value}, () => {
        this.fetchStorageData();
    });
  }

  componentDidMount() {
    axios.get(`/locations`).then(results => this.setState({reservoir_locations: results.data.rows}));
  }
 
  render() {
    return (
      <div className="centered">
        <h1>
          <strong>Reservoir Data Visualizer</strong>
        </h1>
        <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#collapseable">Toggle Options</button>
        <div id="collapseable" className="collapse">
        <div style={{display: 'inline-block', verticalAlign: 'top'}} className="first-dropdown">
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
        <div style={{display: 'inline-block'}}>
        <div style={{display: 'inline-block', margin: '0 50px', verticalAlign: 'top'}} className="centered collapse">
        <p><strong>Option 2</strong></p>
        <MarkedMap selectMarker={this.selectMarker} locations={this.state.reservoir_locations}/>
        </div>
        <div style={{display: 'inline-block', verticalAlign: 'top'}} className="centered">
        <p><strong>Option 3 (Limit 20 Results)</strong></p>
          <input className="search_input" value={this.state.search_term} onChange={this.handleSearchChange}/>
          <SearchResults clear={this.clearSearchResults} selectResult={this.selectMarker} searchResults={this.state.search_results}/>
        </div>
        </div>
        </div>
        <p><strong>{this.state.site ? `Site Number ${this.state.site}` : ''}</strong></p>
        <MonthlyAvgChart year={2020} dates={this.state.dailyDate[2020]} data={this.state.dailyData[2020]}/>
        <MonthlyAvgChart year={2019} dates={this.state.dailyDate[2019]} data={this.state.dailyData[2019]}/>
        <MonthlyAvgChart year={2018} dates={this.state.dailyDate[2018]} data={this.state.dailyData[2018]}/>
          <DataChart data2018={this.state.monthlyAvg2018} data2019={this.state.monthlyAvg2019} data2020={this.state.monthlyAvg2020}/>
      </div>
    );
  }
}

export default App;
