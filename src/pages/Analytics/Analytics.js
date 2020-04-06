import React, { Component } from 'react';
// charts
import HorizontalBarChart from './HorizontalBarChart';
import StackedChart from './StackedChart';
import LineChart from './LineChart';
import RadarChart from './RadarChart';
// css
import './Analytics.css';
// material ui
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

let db = [
  {
    label: 'Zero - Imagine Dragons',
    data: [94, 45, 60, 94, 62, 1, 94, 45, 60, 94, 62, 1]
  },
  {
    label: 'Rich Love - One Republic',
    data: [194, 145, 6, 9, 102, 30, 194, 145, 6, 9, 102, 30]
  },
  {
    label: 'Lose Yourself - Eminem',
    data: [54, 175, 60, 19, 112, 250, 14, 155, 26, 29, 82, 40]
  },
  {
    label: 'Shallow - Lady Gaga & Bradley Cooper',
    data: [294, 45, 16, 29, 2, 10, 74, 120, 77, 300, 36, 3]
  },
  {
    label: 'Zero - Imagine Dragons',
    data: [94, 45, 60, 94, 62, 1, 94, 45, 60, 94, 62, 1]
  },
  {
    label: 'Rich Love - One Republic',
    data: [194, 145, 6, 9, 102, 30, 194, 145, 6, 9, 102, 30]
  },
  {
    label: 'Lose Yourself - Eminem',
    data: [54, 175, 60, 19, 112, 250, 14, 155, 26, 29, 82, 40]
  },
  {
    label: 'Shallow - Lady Gaga & Bradley Cooper',
    data: [294, 45, 16, 29, 2, 10, 74, 120, 77, 300, 36, 3]
  },
  {
    label: 'Zero - Imagine Dragons',
    data: [94, 45, 60, 94, 62, 1, 94, 45, 60, 94, 62, 1]
  },
  {
    label: 'Rich Love - One Republic',
    data: [194, 145, 6, 9, 102, 30, 194, 145, 6, 9, 102, 30]
  }
];

let db2 = [
  {
    label: 'Bon Jovi',
    data: [-94, 45]
  },
  {
    label: 'Eminem',
    data: [-194, 145]
  },
  {
    label: 'Muse',
    data: [-54, 175]
  },
  {
    label: 'Imagine Dragons',
    data: [-294, 45]
  },
  {
    label: 'Bon Jovi',
    data: [-94, 45]
  },
  {
    label: 'Eminem',
    data: [-194, 145]
  },
  {
    label: 'Muse',
    data: [-54, 175]
  },
  {
    label: 'Imagine Dragons',
    data: [-294, 45]
  },
  {
    label: 'Bon Jovi',
    data: [-94, 45]
  },
  {
    label: 'Eminem',
    data: [-194, 145]
  },
];

let db3 = [
  {
    label: 'Weekday',
    data: [44, 55, 10, 30, 2, 20, 14, 35, 56, 1, 12, 40, 64, 55, 70, 84, 42, 11, 124, 65, 30, 74, 82, 10]
  },
  {
    label: 'Weekend',
    data: [94, 45, 6, 9, 102, 30, 94, 45, 6, 9, 2, 30, 94, 45, 60, 94, 62, 1, 94, 45, 60, 94, 62, 1]
  }
];


const TabContainer = (props) => props.children;

class Analytics extends Component {
  state = {
    value: 0
  }

  handleChange = (e, value) => { this.setState({ value }) };

  render() {
    const { value } = this.state;
    return (
      <div className="analytics">
        <div className="wrapper">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="off">
              <Tab label="Tracks Frequency" />
              <Tab label="Morning / Afternoon" />
              <Tab label="Listens per hour" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>
            <StackedChart dataset={db} />
          </TabContainer>}
          {value === 1 && <TabContainer>
            <HorizontalBarChart dataset={db2} />
          </TabContainer>}
          {value === 2 && <TabContainer>
            {
              window.innerWidth < 768 ? // ipad width
                <RadarChart dataset={db3} />
                :
                <LineChart dataset={db3} />
            }
          </TabContainer>}
        </div>
      </div>
    )
  }
}

export default Analytics;