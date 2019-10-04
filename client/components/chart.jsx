import React from 'react';
import { VictoryLabel, VictoryBar, VictoryAxis, VictoryChart, VictoryZoomContainer } from 'victory';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomedXDomain: 0
    };
    this.dataEntryTotal = this.dataEntryTotal.bind(this);
    this.dataEntryPricePerUnit = this.dataEntryPricePerUnit.bind(this);

  }

  onDomainChange(domain) {
    this.setState({
      zoomedXDomain: domain.x
    });
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

      var largestEntryTotal = 0;
      for (var totalsIndex = 0; totalsIndex < dataEntryTotal.length; totalsIndex++) {
        if (dataEntryTotal[totalsIndex]['Entry Totals'] > largestEntryTotal) {
          largestEntryTotal = dataEntryTotal[totalsIndex]['Entry Totals'];
        }
      }

      var largestEntryUnit = 0;
      for (var unitsIndex = 0; unitsIndex < dataEntryPricePerUnit.length; unitsIndex++) {
        if (dataEntryPricePerUnit[unitsIndex]['Entry Totals'] > largestEntryUnit) {
          largestEntryUnit = dataEntryPricePerUnit[unitsIndex]['Entry Totals'];
        }
      }
      return (
        <>
            <VictoryChart
              containerComponent={<VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={{ y: [0, largestEntryTotal * 1.2] }}
              />}
              domainPadding={{ x: 40 }}
              style={{ parent: { maxWidth: '35%', display: 'inline-block', 'paddingLeft': '50px', paddingTop: '2%' } }}>
              <VictoryLabel text="Price per Entry" x={225} y={5} textAnchor="middle"/>
              <VictoryBar style={{ parent: { maxWidth: '50%' } }}
                data={dataEntryTotal}
                // data accessor for x values
                x='Entries'
                // data accessor for y values
                y='Entry Totals'
                animate={{ duration: 650 }}
              />
              <VictoryAxis
                label="Entries"
                style={{
                  axisLabel: { padding: 33 }
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
            containerComponent={<VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={{ y: [0, largestEntryUnit * 1.2] }}
            />}
            domainPadding={{ x: 40 }}
            style={{ parent: { maxWidth: '32%', display: 'inline-block' } }}>
            <VictoryLabel text="Price per Unit" x={225} y={5} textAnchor="middle" />
            <VictoryBar style={{ parent: { maxWidth: '50%' } }}
              data={dataEntryPricePerUnit}
              // data accessor for x values
              x='Entries'
              // data accessor for y values
              y='Entry Totals'
              animate={{ duration: 650 }}
            />
            <VictoryAxis
              label="Entries"
              style={{
                axisLabel: { padding: 33 }
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
