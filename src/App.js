import React, { Component } from "react";
import "./App.css";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import HistoryChartPerCountry from "./components/charts/HistoryChartPerCountry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countriesStats: []
    };
  }

  componentDidMount() {
    fetch("https://corona.lmao.ninja/countries")
      .then(response => response.json())
      .then(countries => this.setState({ countriesStats: countries }));
  }

  render() {
    const { countriesStats } = this.state;
    let countries=[];
    for (let [key, value] of Object.entries(countriesStats)) {
      countries.push(value.country);
    }
    return !countriesStats.length ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <HistoryChartPerCountry props={countries}/>
        <SummaryTable countriesData={countriesStats} />
      </div>
    );
  }
}

export default App;
