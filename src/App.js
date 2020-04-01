import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import HistoryChartPerCountry from "./components/charts/HistoryChartPerCountry";

export default function App() {
  const [countriesStats, setCountriesStats] = useState([]);
  const [countries] = useState([]);

  useEffect(() => {
    fetch("https://corona.lmao.ninja/countries")
      .then(response => response.json())
      .then(countries => setCountriesStats(countries));
  });

  // eslint-disable-next-line
  for (let [key, value] of Object.entries(countriesStats)) {
    countries.push(value.country);
  }

  return !countriesStats.length ? (
    <h1>Loading...</h1>
  ) : (
    <Grid
      container
      direction="row"
      alignContent="space-between"
      alignItems="center"
      justify="space-evenly"
    >
      <HistoryChartPerCountry props={countries} />
      <SummaryTable countriesData={countriesStats} />
    </Grid>
  );
}
