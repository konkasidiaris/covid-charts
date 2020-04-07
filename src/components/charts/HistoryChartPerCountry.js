import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import UseWindowDimensions from "../../utils/UseWindowDimensions"
import { TextField, MenuItem, Grid } from "@material-ui/core";
import "./HistoryChartPerCountry.css";

export default function HistoryChartPerCountry() {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [data, setData] = useState([]);
  const width = UseWindowDimensions();

  const countries = stats => {
    let temp = new Set();
    // eslint-disable-next-line
    for (let [key, value] of Object.entries(stats)) {
      temp.add(value.country);
    }
    return Array.from(temp).sort();
  };

  async function fetchData() {
    const response = await fetch(`https://corona.lmao.ninja/v2/historical`);
    response
      .json()
      .then(data => {
        setHistoricalData(data);
        setCountryList(countries(data));
      })
      .then(setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = event => {
    setCountry(event.target.value);
    changePlotValues(
      historicalData.filter(obj => (obj.country === event.target.value && obj.province === null))
    );
  };

  const changePlotValues = obj => {
    let temp = obj[0].timeline;
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data = [];

    for (let [key, value] of Object.entries(temp.cases)) {
      data1.push({ date: formatDate(key), cases: value });
    }
    for (let [key, value] of Object.entries(temp.deaths)) {
      data2.push({ date: formatDate(key), deaths: value });
    }
    for (let [key, value] of Object.entries(temp.recovered)) {
      data3.push({ date: formatDate(key), recovered: value });
    }
    for (let i = 0; i < data1.length; i++) {
      data.push({ ...data2[i], ...data1[i], ...data3[i] });
    }
    setData(data);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Grid
      id="override-class-for-safari"
      item
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      justify="center"
    >
      <TextField
        select
        id="outlined-basic"
        label="Select Country"
        value={country}
        onChange={handleChange}
        helperText="select whose country's history stats you want to see"
        variant="outlined"
      >
        {countryList.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <LineChart className="linechart" width={width} height={width/2} data={data}>

        <Line type="monotone" dataKey="deaths" stroke="#8884d8" />
        <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
        <Line type="monotone" dataKey="recovered" stroke="#82dadd" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="date"
          label={{ value: "days", offset: -2, position: "insideBottom" }}
        />
        <YAxis
          label={{
            value: "total cases",
            angle: -90,
            position: "insideLeft"
          }}
        />
        <Tooltip isAnimationActive={false} />
        <Legend />
      </LineChart>
    </Grid>
  );

  function formatDate(date) {
    return new Date(date).toISOString().substring(0, 10);
  }
}
