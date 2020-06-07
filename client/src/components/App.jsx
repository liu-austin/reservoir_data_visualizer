// jshint esversion:6
import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "",
      site: null,
      sites: []
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
        console.log(this.state.site);
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
      </div>
    );
  }
}

export default App;
