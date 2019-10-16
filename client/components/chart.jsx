import React from 'react';
import { VictoryLabel, VictoryBar, VictoryAxis, VictoryChart, VictoryZoomContainer } from 'victory';
import AppContext from '../context';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomedXDomain: 0
    };
    this.dataEntryTotal = this.dataEntryTotal.bind(this);
    this.dataEntryPricePerUnit = this.dataEntryPricePerUnit.bind(this);
    this.dataSalesPerDay = this.dataSalesPerDay.bind(this);
    this.dataSalesPerHour = this.dataSalesPerHour.bind(this);
  }

  dataEntryTotal() {
    const data = [];

    for (var i = 0; i < this.context.entries.length; i++) {
      var entryAbbrevNameIndex;
      if (this.context.entries[i].entryName.indexOf(' ') > 1) {
        if (this.context.entries[i].entryName.indexOf(' ') > 4) {
          entryAbbrevNameIndex = 6;
        } else {
          entryAbbrevNameIndex = this.context.entries[i].entryName.indexOf(' ') + 2;
        }
      } else if (this.context.entries[i].entryName.length <= 6) {
        entryAbbrevNameIndex = this.context.entries[i].entryName.length;
      } else if (this.context.entries[i].entryName.length > 6) {
        entryAbbrevNameIndex = 6;
      }

      data.push({
        'Entries': this.context.entries[i].entryName.substring(0, entryAbbrevNameIndex),
        'Entry Totals': parseFloat(this.context.entries[i].entryPrice * this.context.entries[i].entryUnits / 100),
        'label': parseFloat(this.context.entries[i].entryPrice * this.context.entries[i].entryUnits / 100)
      });

    }
    return data;

  }

  dataEntryPricePerUnit() {
    const data = [];
    for (var i = 0; i < this.context.entries.length; i++) {
      var entryAbbrevNameIndex;
      if (this.context.entries[i].entryName.indexOf(' ') > 1) {
        if (this.context.entries[i].entryName.indexOf(' ') > 4) {
          entryAbbrevNameIndex = 6;
        } else {
          entryAbbrevNameIndex = this.context.entries[i].entryName.indexOf(' ') + 2;
        }
      } else if (this.context.entries[i].entryName.length <= 6) {
        entryAbbrevNameIndex = this.context.entries[i].entryName.length;
      } else if (this.context.entries[i].entryName.length > 6) {
        entryAbbrevNameIndex = 6;
      }
      data.push({
        'Entries': this.context.entries[i].entryName.substring(0, entryAbbrevNameIndex),
        'Entry Totals': parseFloat(this.context.entries[i].entryPrice / 100),
        'label': parseFloat(this.context.entries[i].entryPrice / 100)
      });
    }
    return data;
  }

  dataSalesPerDay() {

    var datesArray = [];

    this.context.entries.map(entry => {
      var date = entry.entryTime.substring(0, entry.entryTime.indexOf('T'));
      datesArray.push(date);
    });
    var tally = {};
    var currentEntry;
    for (var i = 0; i < datesArray.length; i++) {
      currentEntry = datesArray[i];
      tally[currentEntry] = (tally[currentEntry] || 0) + 1;
    }
    var dataArray = [];
    var dates = Object.keys(tally);
    for (i = 0; i < dates.length; i++) {
      var key;
      var value;
      key = dates[i];
      value = tally[key];

      var newDataObj = { dates: key.substring(5), sales: value, label: value };
      dataArray.push(newDataObj);
    }
    return dataArray;
  }

  dataSalesPerHour() {
    var hoursArray = [];

    this.context.entries.map(entry => {
      var date = entry.entryTime.substring(entry.entryTime.indexOf('T') + 1);
      hoursArray.push(date);
    });
    var tally = {};
    var currentEntry;
    for (var i = 0; i < hoursArray.length; i++) {
      currentEntry = hoursArray[i].substring(0, 2);
      tally[currentEntry] = (tally[currentEntry] || 0) + 1;
    }
    var dataArray = [];
    var hours = Object.keys(tally);
    for (i = 0; i < hours.length; i++) {
      var key;
      var value;
      key = hours[i];
      value = tally[key];

      var newDataObj = { hours: key, sales: value, label: value };
      dataArray.push(newDataObj);
    }
    dataArray.sort((objA, objB) => (objA.hours > objB.hours) ? 1 : -1);
    return dataArray;
  }

  render() {
    if (this.context.entries !== undefined) {
      var dataEntryTotal = this.dataEntryTotal();
      var dataEntryPricePerUnit = this.dataEntryPricePerUnit();
      var dataEntrySalesPerDay = this.dataSalesPerDay();
      var dataEntrySalesPerHour = this.dataSalesPerHour();

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
              zoomDomain={{ x: [0, 7], y: [0, largestEntryTotal * 1.2] }}
            />}
            domainPadding={{ x: 40 }}
            style={{ parent: { maxWidth: '35%', display: 'inline-block', marginLeft: '10%', marginTop: '10%' } }}>
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
              zoomDomain={{ x: [0, 7], y: [0, largestEntryUnit * 1.2] }}
            />}
            domainPadding={{ x: 40 }}
            style={{ parent: { maxWidth: '35%', display: 'inline-block', marginLeft: '5%', marginTop: '10%' } }}>
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

          <VictoryChart
            containerComponent={<VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={{ x: [0, 7], y: [0, largestEntryTotal * 1.2] }}
            />}
            domainPadding={{ x: 40 }}
            style={{ parent: { maxWidth: '35%', display: 'inline-block', marginLeft: '10%', marginTop: '3%' } }}>
            <VictoryLabel text="Sales Per Day" x={225} y={5} textAnchor="middle" />
            <VictoryBar style={{ parent: { maxWidth: '50%' } }}
              data={dataEntrySalesPerDay}
              // data accessor for x values
              x='dates'
              // data accessor for y values
              y='sales'
              animate={{ duration: 650 }}
            />
            <VictoryAxis
              label="Dates"
              style={{
                axisLabel: { padding: 33 }
              }}
            />
            <VictoryAxis dependentAxis
              label="Sales"
              style={{
                axisLabel: { padding: 35 }
              }}
            />
          </ VictoryChart>

          <VictoryChart
            containerComponent={<VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={{ x: [0, 12], y: [0, largestEntryTotal * 1.2] }}
            />}
            domainPadding={{ x: 40 }}
            style={{ parent: { maxWidth: '35%', display: 'inline-block', marginLeft: '5%', marginTop: '3%' } }}>
            <VictoryLabel text="Sales Per Hour" x={225} y={5} textAnchor="middle" />
            <VictoryBar style={{ parent: { maxWidth: '50%' } }}
              data={dataEntrySalesPerHour}
              // data accessor for x values
              x='hours'
              // data accessor for y values
              y='sales'
              animate={{ duration: 650 }}
            />
            <VictoryAxis
              label="Hours"
              style={{
                axisLabel: { padding: 33 }
              }}
            />
            <VictoryAxis dependentAxis
              label="Sales"
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

Chart.contextType = AppContext;
