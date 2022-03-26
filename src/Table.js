import React from "react";
import numeral from "numeral";
import "./Table.css";
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function Table({ subData, countries, sortCriteria, setSortCriteria }) {
  const subDataPerOneMillion = subData + 'PerOneMillion';
  let tableDatas;
  if (subData === 'cases') {
    tableDatas = countries.map(({ country, cases, casesPerOneMillion }) => (
      <tr>
        <td>{country}</td>
        <td>
          <strong>{numeral(cases).format("0,0")}</strong>
        </td>
        <td>
          <strong>{numeral(casesPerOneMillion).format("0,0")}</strong>
        </td>
      </tr>
    ));
  } else if (subData === 'deaths') {
    tableDatas = countries.map(({ country, deaths, deathsPerOneMillion }) => (
      <tr>
        <td>{country}</td>
        <td>
          <strong>{numeral(deaths).format("0,0")}</strong>
        </td>
        <td>
          <strong>{numeral(deathsPerOneMillion).format("0,0")}</strong>
        </td>
      </tr>
    ));
  }
  return (
    <div className="table">
      <table>
        <tr>
          <th>
            <span>Country</span>
            <IconButton onClick={() => setSortCriteria('country')} >
                <ArrowDownwardIcon style={sortCriteria == 'country' ? {color: '#4ed04e'} : {}} />
            </IconButton>
          </th>
          <th>
            <span style={{ textTransform: 'capitalize' }}>{subData}</span>
            <IconButton onClick={() => setSortCriteria(subData)}>
                <ArrowDownwardIcon style={sortCriteria == subData ? {color: '#4ed04e'} : {}} />
            </IconButton>
          </th>
          <th>
            <span style={{ textTransform: 'capitalize' }}>{subData} Per One Million</span>
            <IconButton onClick={() => setSortCriteria(subDataPerOneMillion)}>
                <ArrowDownwardIcon style={sortCriteria == subDataPerOneMillion ? {color: '#4ed04e'} : {}} />
            </IconButton>
          </th>
        </tr>
        {tableDatas}
      </table>
    </div>
  );
}

export default Table;
