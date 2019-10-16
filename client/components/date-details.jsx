import React from 'react';
import { withRouter } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

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
    var hasHour = false;
    for (i = 0; i < 24; i++) {
      if (dataArray[i]) {
        for (var j = 0; j < 24; j++) {
          if (dataArray[j]) {
            if (parseInt(dataArray[j].hour) === i) {
              hasHour = true;
            }
          }
        }
        if (!hasHour) {
          if (i < 10) {
            dataArray.push({ hour: ('0' + i), sales: 0 });
          } else {
            dataArray.push({ hour: (i), sales: 0 });
          }
        }
      }
    }
    dataArray.sort((objA, objB) => (objA.hour > objB.hour) ? 1 : -1);
    var dataArrayFirst = [];
    var dataArraySecond = [];

    dataArray.map(data => {
      if (parseInt(data.hour) < 12) {
        dataArrayFirst.push(data);
      } else {
        dataArraySecond.push(data);
      }
    });

    var dataArrayTotal = [];
    dataArrayTotal.push(dataArrayFirst);
    dataArrayTotal.push(dataArraySecond);
    return dataArrayTotal;
  }

  render() {

    if (this.state.dateEntries.length) {
      var daySalesData = this.dataDaySales();
      var daySalesFirst = [];
      var daySalesSecond = [];
      if (daySalesData.length === 2) {
        daySalesFirst = daySalesData[0];
        daySalesSecond = daySalesData[1];
      } else if (parseInt(daySalesData[0][0].hour) < 12) {
        daySalesFirst = daySalesData[0];
      } else {
        daySalesSecond = daySalesData[0];
      }

      var largestEntryFirst = 0;
      for (var totalsIndex = 0; totalsIndex < daySalesFirst.length; totalsIndex++) {
        if (daySalesFirst[totalsIndex].sales > largestEntryFirst) {
          largestEntryFirst = daySalesFirst[totalsIndex].sales;
        }
      }

      var largestEntrySecond = 0;
      for (totalsIndex = 0; totalsIndex < daySalesSecond.length; totalsIndex++) {
        if (daySalesSecond[totalsIndex].sales > largestEntrySecond) {
          largestEntrySecond = daySalesSecond[totalsIndex].sales;
        }
      }
    }

    if (daySalesData) {
      return (
      <>
        <VictoryChart domainPadding = {{ x: 35 }}
          domain={{ y: [0, (largestEntryFirst * 1.2 || 2)] }}
          height={200} width ={600}
          style={{ parent: { height: '30vh',
            maxWidth: '70%',
            position: 'absolute',
            left: '15%',
            top: '10%' } }}>
          <VictoryBar
            data={daySalesFirst}
            // data accessor for x values
            x='hour'
            // data accessor for y values
            y='sales'
            animate={{ duration: 650 }}/>
          <VictoryAxis
            tickValues={['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']}
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

          <VictoryChart domainPadding={{ x: 35 }}
            domain={{ y: [0, (largestEntrySecond * 1.2 || 2)] }}
            height={200} width={600}
            style={{ parent: { height: '30vh',
              maxWidth: '70%',
              position: 'absolute',
              left: '15%',
              top: '50%' } }}>
            <VictoryBar
              data={daySalesSecond}
              // data accessor for x values
              x='hour'
              // data accessor for y values
              y='sales'
              animate={{ duration: 650 }} />
            <VictoryAxis
              tickValues={['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']}
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
      </>
      );
    } else {
      return <h1 style={{ fontSize: '4rem', position: 'absolute', right: '22%', top: '45%' }}>No sales were made on {this.props.match.params.date}</h1>;
    }
  }
}

export default withRouter(DateDetails);
