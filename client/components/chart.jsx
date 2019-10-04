import React from 'react';
import { VictoryLabel, VictoryBar, VictoryAxis, VictoryChart } from 'victory';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartState: null
    };
    this.dataEntryTotal = this.dataEntryTotal.bind(this);
    this.dataEntryPricePerUnit = this.dataEntryPricePerUnit.bind(this);

  }

  dataEntryTotal() {
    const data = [];
    for (var i = 0; i < this.props.entries.length; i++) {
      var entryAbbrevNameIndex;
      if (this.props.entries[i].entryName.indexOf(' ') > 1) {
        if (this.props.entries[i].entryName.indexOf(' ') > 4) {
          entryAbbrevNameIndex = 6;
        } else {
          entryAbbrevNameIndex = this.props.entries[i].entryName.indexOf(' ') + 2;
        }
      } else if (this.props.entries[i].entryName.length <= 6) {
        entryAbbrevNameIndex = this.props.entries[i].entryName.length;
      } else if (this.props.entries[i].entryName.length > 6) {
        entryAbbrevNameIndex = 6;
      }

      data.push({
        'Entries': this.props.entries[i].entryName.substring(0, entryAbbrevNameIndex),
        'Entry Totals': parseFloat(this.props.entries[i].entryPrice * this.props.entries[i].entryUnits / 100),
        'label': parseFloat(this.props.entries[i].entryPrice * this.props.entries[i].entryUnits / 100)
      });
    }
    return data;
  }

  dataEntryPricePerUnit() {
    const data = [];
    for (var i = 0; i < this.props.entries.length; i++) {
      var entryAbbrevNameIndex;
      if (this.props.entries[i].entryName.indexOf(' ') > 1) {
        if (this.props.entries[i].entryName.indexOf(' ') > 4) {
          entryAbbrevNameIndex = 6;
        } else {
          entryAbbrevNameIndex = this.props.entries[i].entryName.indexOf(' ') + 2;
        }
      } else if (this.props.entries[i].entryName.length <= 6) {
        entryAbbrevNameIndex = this.props.entries[i].entryName.length;
      } else if (this.props.entries[i].entryName.length > 6) {
        entryAbbrevNameIndex = 6;
      }
      data.push({
        'Entries': this.props.entries[i].entryName.substring(0, entryAbbrevNameIndex),
        'Entry Totals': parseFloat(this.props.entries[i].entryPrice / 100),
        'label': parseFloat(this.props.entries[i].entryPrice / 100)
      });
    }
    return data;
  }

  render() {

    if (this.props.entries[0] !== undefined) {
      var dataEntryTotal = this.dataEntryTotal();
      var dataEntryPricePerUnit = this.dataEntryPricePerUnit();

      return (
        <>

          <VictoryChart

            domainPadding={{ x: 20 }}
            style={{ parent: { maxWidth: '40%', display: 'inline-block', 'paddingLeft': '50px' } }}>
            <VictoryLabel text="Price per Entry" x={225} y={5} textAnchor="middle" />
            <VictoryBar style={{ parent: { maxWidth: '50%' } }}
              data={dataEntryTotal}
              // data accessor for x values
              x='Entries'
              // data accessor for y values
              y='Entry Totals'
              animate={{ duration: 2000 }}
            />
            <VictoryAxis
              label="Entries"
              style={{
                axisLabel: { padding: 30 }
              }}
            />
            <VictoryAxis dependentAxis
              label="Entry Total Cost"
              style={{
                axisLabel: { padding: 35 }
              }}
            />
          </ VictoryChart>

          <VictoryChart

            domainPadding={{ x: 20 }}
            style={{ parent: { maxWidth: '38%', display: 'inline-block' } }}>
            <VictoryLabel text="Price per Unit" x={225} y={5} textAnchor="middle" />
            <VictoryBar style={{ parent: { maxWidth: '50%' } }}
              data={dataEntryPricePerUnit}
              // data accessor for x values
              x='Entries'
              // data accessor for y values
              y='Entry Totals'
              animate={{ duration: 2000 }}
            />
            <VictoryAxis
              label="Entries"
              style={{
                axisLabel: { padding: 30 }
              }}
            />
            <VictoryAxis dependentAxis
              label="Entry Price Per Unit"
              style={{
                axisLabel: { padding: 35 }
              }}
            />
          </ VictoryChart>
        </>
      );
    } else {
      return null;
    }
  }
}
