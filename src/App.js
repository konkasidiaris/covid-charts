import React, { Component } from "react";
import "./App.css";
import SummaryTable from "./SummaryTable/SummaryTable";

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
    return !countriesStats.length ? (
      <h1>Loading...</h1>
    ) : (
        <SummaryTable countriesData={countriesStats}/>
    );
  }
}

export default App;
