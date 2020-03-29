import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

class HistoryChartPerCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.countryName,
      countryData: {}
    };
  }

  componentDidMount() {
    fetch("https://corona.lmao.ninja/v2/historical/greece")
      .then(response => response.json())
      .then(data =>
        this.setState({
          countryData: data.timeline.cases
        })
      )
      .catch(console.log);
  }

  render() {
    const { countryData } = this.state;
    let data =[];
    for (let [key, value] of Object.entries(countryData)){
        data.push({date:key , value:value});
    }
    return (
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  }
}

export default HistoryChartPerCountry;
