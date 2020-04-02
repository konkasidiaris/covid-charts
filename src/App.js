import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import HistoryChartPerCountry from "./components/charts/HistoryChartPerCountry";

export default function App() {
  return( 
    <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      justify="center"
      spacing={4}
      style={{ padding: 16 }}
    >
      <Typography variant="h3" component="h3">
        Covid charts & statistics
      </Typography>
      <HistoryChartPerCountry />
      <SummaryTable />
    </Grid>
  );
}
