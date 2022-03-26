import React from "react";
import {
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import Table from "./Table";
import LineGraph from "./LineGraph";
import PropTypes from "prop-types";

function GeneralSituation(props) {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
        props.setSortCriteria('cases');
        props.setGraphData('cases');
    } else if (newValue === 1) {
        props.setSortCriteria('deaths');
        props.setGraphData('deaths');
    }
  };

  return (
    <Card>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "gray" }}>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Cases" {...a11yProps(0)} />
            <Tab label="Deaths" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <CardContent>
        <TabPanel value={value} index={0}>
          <h3>Total Cases by Country</h3>
          <Table
            countries={props.data}
            subData='cases'
            sortCriteria={props.sortCriteria}
            setSortCriteria={props.setSortCriteria}
          />
          <h3 style={{ marginBottom: "20px" }}>Worldwide new {props.graphData}</h3>
          <LineGraph casesType={props.graphData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3>Total Deaths by Country</h3>
          <Table
            countries={props.data}
            subData='deaths'
            sortCriteria={props.sortCriteria}
            setSortCriteria={props.setSortCriteria}
          />
          <h3 style={{ marginBottom: "20px" }}>Worldwide new {props.graphData}</h3>
          <LineGraph casesType={props.graphData} />
        </TabPanel>
      </CardContent>
    </Card>
  );
}

export default GeneralSituation;
