import React from 'react';
import { VictoryBar, VictoryAxis, VictoryChart } from 'victory';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartState: null
    };
    this.dataRotation = this.dataRotation.bind(this);
  }

  dataRotation() {
    const data = [];
    for (var i = 0; i < this.props.entries.length; i++) {
      data.push({
        'Entries': this.props.entries[i].entryID,
        'Entry Totals': parseFloat(this.props.entries[i].entryPrice * this.props.entries[i].entryUnits / 100)
      });
    }
    return data;
  }

  render() {

    if (this.props.entries[0] !== undefined) {
      var data = this.dataRotation();
      return (
        <VictoryChart
          domainPadding={{ x: 40 }}
          style={{ parent: { maxWidth: '20%' } }}
        >
          <VictoryBar style={{ parent: { maxWidth: '20%' } }}
            data={data}
            // data accessor for x values
            x='Entries'
            // data accessor for y values
            y='Entry Totals'
          />
          <VictoryAxis
            label="Entries"
            style={{
              axisLabel: { padding: 30 }
            }}
          />
          <VictoryAxis dependentAxis
            label="Entry Totals"
            style={{
              axisLabel: { padding: 40 }
            }}
          />
        </ VictoryChart>
      );
    } else {
      return null;
    }
  }
}
