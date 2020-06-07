// jshint esversion:6
import React from "react";
import axios from "axios";
import MonthlyAvgChart from './monthly_avg_chart.jsx';
import MarkedMap from './marked_map.jsx';
import SearchResults from './search_results.jsx';
import SearchResult from "./search_result.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "",
      site: null,
      sites: [],
      reservoir_data: [],
      reservoir_locations: [],
      monthlyAvg: [],
      search_term: '',
      search_results: []
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
                let avg = [];
                for (let i = 1; i < 6; i++) {
                    avg.push(monthlyTotal[i] / monthlyNum[i]);
                }
                this.setState({monthlyAvg: avg});
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
        <div style={{display: 'inline-block'}}>
        <div className="centered">
        <p><strong>Option 2</strong></p>
        <MarkedMap selectMarker={this.selectMarker} locations={this.state.reservoir_locations}/>
        </div>
        <div className="centered">
        <p><strong>Option 3 (Limit 20 Results)</strong></p>
          <input className="search_input" value={this.state.search_term} onChange={this.handleSearchChange}/>
          <SearchResults clear={this.clearSearchResults} selectResult={this.selectMarker} searchResults={this.state.search_results}/>
        </div>
        </div>
        <MonthlyAvgChart data={this.state.monthlyAvg}/>

      </div>
    );
  }
}

export default App;
