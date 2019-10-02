import React from 'react';
import Header from './header';
import EntryTable from './entries';
import EntryForm from './entry-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
    this.getAllEntries = this.getAllEntries.bind(this);
    this.getEntryAverage = this.getEntryAverage.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.getProductAverage = this.getProductAverage.bind(this);
  }

  componentDidMount() {
    this.getAllEntries();
  }

  getProductAverage() {
    var productTotal = 0;
    for (var i = 0; i < this.state.entries.length; i++) {
      productTotal += this.state.entries[i].price;
    }
    var average = productTotal / this.state.entries.length;
    return average;
  }

  getEntryAverage() {
    var entryTotal = 0;
    for (var i = 0; i < this.state.entries.length; i++) {
      entryTotal += (this.state.entries[i].price * this.state.entries[i].units);
    }
    var average = entryTotal / this.state.entries.length;
    return average;
  }

  getAllEntries() {
    fetch('/api/entries')
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.setState({ entries: jsonResponse });
      });
  }

  addEntry(newEntry) {
    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then(response => response.json())
      .then(entry => {
        this.getAllEntries();
      });
  }

  deleteEntry(event) {
    var currentEntry = event.target.getAttribute('data-key');
    fetch(`/api/entries/${currentEntry}`, {
      method: 'DELETE'
    }).then(() => {
      return 'done';
    });
    var changedEntries = this.state.entries.filter(entry => {
      if (entry.entryID + '' !== currentEntry) {
        return entry;
      }
    });
    this.setState({ entries: changedEntries });

  }

  render() {

    return (
      <React.Fragment>
        <Header getProductAverage= {this.getProductAverage} getEntryAverage ={this.getEntryAverage}/>
        <EntryTable entries = {this.state.entries} deleteEntry = {this.deleteEntry}/>
        <EntryForm addEntry = {this.addEntry}/>

      </React.Fragment>
    );
  }
}

export default App;
