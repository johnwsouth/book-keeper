import React from 'react';
import { VictoryBar } from 'victory';

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
        entryID: this.props.entries[i].entryID,
        entryTotal: parseFloat(this.props.entries[i].entryPrice * this.props.entries[i].entryUnits / 100)
      });
    }
    return data;
  }

  render() {

    if (this.props.entries[0] !== undefined) {
      var data = this.dataRotation();
      return (
        <VictoryBar style={{ parent: { maxWidth: '20%' } }}
          data={data}
          // data accessor for x values
          x="entryID"
          // data accessor for y values
          y="entryTotal  "
        />
      );
    } else {
      return null;
    }
  }
}
