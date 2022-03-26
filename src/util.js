import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#f54242",
      multiplier: 70,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 75,
    },
    deaths: {
      hex: "#f54242",
      multiplier: 450,
    },
};

export const sortData = (data, sortCriteria) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (sortCriteria !== 'country' ? a[sortCriteria] > b[sortCriteria] : a[sortCriteria] < b[sortCriteria]) {
            return -1;
        } else {
            return 1;
        }
    });

    return sortedData;
};

export const prettyPrintStat = (stat) => 
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// DRAW circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType, selectedCountry, vaccineData) =>
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{ color: country.countryInfo.iso2 === selectedCountry ? 'blue' : casesTypeColors[casesType].hex }}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            } 
        >
            <Popup>
                <div className="infoContainer">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed"><b>Total Cases: </b>{numeral(country.cases).format("0,0")}</div>
                    <div className="info-confirmed"><b>Cases Per One Million: </b>{numeral(country.casesPerOneMillion).format("0,0")}</div>
                    <div className="info-recovered"><b>Total Recovered: </b>{numeral(country.recovered).format("0,0")}</div>
                    <div className="info-recovered"><b>Recovered Per One Million: </b>{numeral(country.recoveredPerOneMillion).format("0,0")}</div>
                    <div className="info-deaths"><b>Total Deaths: </b>{numeral(country.deaths).format("0,0")}</div>
                    <div className="info-deaths"><b>Deaths Per One Million: </b>{numeral(country.deathsPerOneMillion).format("0,0")}</div>
                    <div className="info-deaths"><b>Total Vaccines: </b>{vaccineData.hasOwnProperty(country.country) ? numeral(  vaccineData[country.country].totalAmount).format("0,0") : ''}</div>
                    <div className="info-deaths"><b>Vaccines Per One Million </b>{vaccineData.hasOwnProperty(country.country) ? numeral( vaccineData[country.country].totalAmount * 1000000 / 
                    (country.deaths * 1000000 /  country.deathsPerOneMillion) ).format("0,0") : ''}</div>
                </div>
            </Popup>
        </Circle>
    ));