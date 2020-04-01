import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { TextField, MenuItem } from "@material-ui/core";

export default function HistoryChartPerCountry({ props }) {
  const [country, setCountry] = useState("Greece");
  const [cases, setCases] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://corona.lmao.ninja/v2/historical/${country}`)
      .then(response => response.json())
      .then(timeline => {
        setCases(timeline.timeline.cases);
        setRecovered(timeline.timeline.recovered);
        setDeaths(timeline.timeline.deaths);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [country]);

  const countries = props;
  const handleChange = event => {
    setCountry(event.target.value);
  };
  let data = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];

  for (let [key, value] of Object.entries(cases)) {
    data1.push({ date: formatDate(key), dailyCases: value });
  }
  for (let [key, value] of Object.entries(deaths)) {
    data2.push({ date: formatDate(key), dailyDeaths: value });
  }
  for (let [key, value] of Object.entries(recovered)) {
    data3.push({ date: formatDate(key), dailyRecovered: value });
  }
  for (let i = 0; i < data1.length; i++) {
    data.push({ ...data2[i], ...data1[i], ...data3[i] });
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <TextField
        select
        id="outlined-basic"
        label="Select Country"
        value={country}
        onChange={handleChange}
        helperText="select whose country's history stats you want to see"
        variant="outlined"
      >
        {countries.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="dailyDeaths" stroke="#8884d8" />
        <Line type="monotone" dataKey="dailyCases" stroke="#82ca9d" />
        <Line type="monotone" dataKey="dailyRecovered" stroke="#82dadd" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="date"
          label={{ value: "days", offset: 0, position: "insideBottom" }}
        />
        <YAxis
          label={{
            value: "number of cases/recovered/deaths",
            angle: -90,
            position: "insideLeft"
          }}
        />
        <Tooltip />
      </LineChart>
    </div>
  );

  function formatDate(date) {
    return new Date(date).toISOString().substring(0, 10);
  }
}
