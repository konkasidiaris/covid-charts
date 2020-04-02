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
import "./SummaryTable.css";

export default function SummaryTable() {
  const [loading, setLoading] = useState(true);

  const [countriesStats, setCountriesStats] = useState([]);
  const tableIcons = {
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
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
  }, []);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <div>
      <div className="regular-table">
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
      </div>
      <div className="cell-phone-table">
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "Country", field: "country" },
            { title: "Cases", field: "cases" },
            { title: "Deaths", field: "deaths" }
          ]}
          data={countriesStats}
          title="COVID-19"
          detailPanel={[
            {
              tooltip: "tap me for more information",
              render: rowData => {
                return (
                  <div className="cell-phone-table-panel">
                    <p>
                      <img
                        alt={rowData.country + `'s flag`}
                        src={rowData.countryInfo.flag}
                        style={{ maxWidth: 40 }}
                      />
                    </p>
                    <p>Country:<strong>{rowData.country}</strong></p>
                    <p>Cases:<strong>{rowData.cases}</strong></p>
                    <p>Deaths:<strong>{rowData.deaths}</strong></p>
                    <p>Recovered:<strong>{rowData.recovered}</strong></p>
                    <p>Active:<strong>{rowData.active}</strong></p>
                    <p>Critical:<strong>{rowData.critical}</strong></p>
                    <p>Cases/million:<strong>{rowData.casesPerOneMillion}</strong></p>
                    <p>Deaths/million:<strong>{rowData.deathsPerOneMillion}</strong></p>
                  </div>
                );
                //this is actually dangerous, library does not
                //provide a better way to do detail panels
              }
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </div>
    </div>
  );
}
