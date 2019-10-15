import React from 'react';
import { withRouter } from 'react-router-dom';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

class DateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDate: this.props.match.params.date,
      dateEntries: []
    };
    this.getDaySales = this.getDaySales.bind(this);
    this.dataDaySales = this.dataDaySales.bind(this);
  }

  componentDidMount() {
    this.getDaySales();
  }

  getDaySales() {
    fetch(`http://localhost:3000/api/entries/day/${'' + this.props.match.params.date}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ dateEntries: data });
      });
  }

  dataDaySales() {
    var timesArray = [];

    this.state.dateEntries.map(entry => {
      var time = entry.entryTime.substring(entry.entryTime.indexOf('T') + 1, entry.entryTime.indexOf('T') + 3);
      timesArray.push(time);
    });
    var tally = {};
    var currentEntry;
    for (var i = 0; i < timesArray.length; i++) {
      currentEntry = timesArray[i];
      tally[currentEntry] = (tally[currentEntry] || 0) + 1;
    }
    var dataArray = [];
    var times = Object.keys(tally);
    for (i = 0; i < times.length; i++) {
      var key;
      var value;
      key = times[i];
      value = tally[key];

      var newDataObj = { hour: key, sales: value, label: value };
      dataArray.push(newDataObj);
    }
    return dataArray;
  }

  render() {
    if (this.state.dateEntries.length > 0) {
      var daySalesData = this.dataDaySales();
    }
    if (daySalesData) {

      return (
      <>
        <VictoryChart height={200} width ={600} style={{ parent: { height: '30vh', maxWidth: '70%', position: 'absolute', left: '15%', top: '10%' } }}>
          <VictoryLine
            data={daySalesData}
            // data accessor for x values
            x='hour'
            // data accessor for y values
            y='sales'
            animate={{ duration: 650 }}/>
          <VictoryAxis
            label="Hour"
            style={{
              axisLabel: { fontSize: 10, padding: 30 }

            }}
          />
          <VictoryAxis dependentAxis
            label="Sales"
            style={{
              axisLabel: { fontSize: 10, padding: 35 }
            }}
          />
        </VictoryChart>

        <VictoryChart height={200} width={600} style={{ parent: { height: '30vh', maxWidth: '70%', position: 'absolute', left: '15%', top: '50%' } }}>
          <VictoryLine
            data={[
              { hour: '12:00', sales: 6 },
              { hour: '13:00', sales: 2 },
              { hour: '14:00', sales: 4 },
              { hour: '15:00', sales: 6 },
              { hour: '16:00', sales: 0 },
              { hour: '17:00', sales: 4 },
              { hour: '18:00', sales: 8 },
              { hour: '19:00', sales: 2 },
              { hour: '20:00', sales: 1 },
              { hour: '21:00', sales: 6 },
              { hour: '22:00', sales: 3 },
              { hour: '23:00', sales: 5 }
            ]}
            // data accessor for x values
            x='hour'
            // data accessor for y values
            y='sales'
            animate={{ duration: 650 }} />
          <VictoryAxis
            label="Hour"
            style={{
              axisLabel: { fontSize: 10, padding: 30 }

            }}
          />
          <VictoryAxis dependentAxis
            label="Sales"
            style={{
              axisLabel: { fontSize: 10, padding: 35 }
            }}
          />
        </VictoryChart>
        <h1 style={{ position: 'absolute', top: '50%' }}>Im the date {this.props.match.params.date}</h1>
      </>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(DateDetails);
