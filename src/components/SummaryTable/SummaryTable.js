import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import MaterialTable from "material-table";

export default function SummaryTable() {
  const [loading, setLoading] = useState(true);

  const [countriesStats, setCountriesStats] = useState([]);
  const tableIcons = {
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    ))
  };

  async function fetchData() {
    const response = await fetch("https://corona.lmao.ninja/countries");
    response
      .json()
      .then(countries => setCountriesStats(countries))
      .then(setLoading(false));
  }

  useEffect(() => {
    fetchData();
    console.log("gia onoma");
  }, []);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <MaterialTable
      icons={tableIcons}
      columns={[
        {
          title: "",
          field: "countryInfo.flag",
          searchable: false,
          sorting: false,
          render: rowData => (
            <img
              alt={rowData.country + `'s flag`}
              src={rowData.countryInfo.flag}
              style={{ maxWidth: 25 }}
            />
          )
        },
        { title: "Country", field: "country" },
        { title: "Cases", field: "cases" },
        { title: "Deaths", field: "deaths" },
        { title: "Recovered", field: "recovered" },
        { title: "Active", field: "active" },
        { title: "Critical", field: "critical" },
        { title: "Cases/million", field: "casesPerOneMillion" },
        { title: "Deaths/million", field: "deathsPerOneMillion" }
      ]}
      data={countriesStats}
      title="COVID-19 data by country"
    />
  );
}
