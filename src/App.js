import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import HistoryChartPerCountry from "./components/charts/HistoryChartPerCountry";

export default function App() {
  const [countriesStats, setCountriesStats] = useState([]);

  useEffect(() => {
    fetch("https://corona.lmao.ninja/countries")
      .then(response => response.json())
      .then(countries => setCountriesStats(countries));
  });

  const countries = (stats) => {
    let temp = [];
    // eslint-disable-next-line
    for (let [key, value] of Object.entries(stats)) {
      temp.push(value.country);
    }
    return temp.sort();
  };

  return !countriesStats.length ? (
    <h1>Loading...</h1>
  ) : (
    <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      justify="center"
      xs
      spacing={4}
      style={{padding:16}}
    >
      <Typography variant="h3" component="h3" noWrap>Covid charts & statistics</Typography>
      <HistoryChartPerCountry noWrap props={countries(countriesStats)} />
      <SummaryTable noWrap countriesData={countriesStats} />
    </Grid>
  );
}
