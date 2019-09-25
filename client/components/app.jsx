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
  }

  componentDidMount() {
    this.getAllEntries();
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
        const newEntries = this.state.entries.concat(entry);
        this.setState({ entries: newEntries });
      });
  }

  deleteEntry(event) {
    var currentEntry = event.target.getAttribute('data-key');
    fetch(`/api/entries/${currentEntry}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        var newEntriesArray = this.state.entries.map(entryObject => {
          if (entryObject.id === currentEntry) {
            return;
          }
          return entryObject;
        }).then(() => {
          this.setState({ newEntriesArray });
        });
      });
  }

  render() {

    return (
      <React.Fragment>
        <Header getAverage ={this.getEntryAverage}/>
        <EntryTable entries = {this.state.entries} deleteEntry = {this.deleteEntry}/>
        <EntryForm onSubmit = {this.addEntry}/>

      </React.Fragment>
    );
  }
}

export default App;
