import AppContext from '../context';
import React from 'react';
import Header from './header';
import EntryTable from './entries';
import EntryForm from './entry-form';
import Chart from './chart';
import CalendarContainer from './calendar-container';
import DateDetails from './date-details';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      currentTable: 'All Entries'
    };
    this.getAllEntries = this.getAllEntries.bind(this);
    this.getEntryAverage = this.getEntryAverage.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.getProductAverage = this.getProductAverage.bind(this);
    this.getTodaysEntries = this.getTodaysEntries.bind(this);
    this.setCurrentTable = this.setCurrentTable.bind(this);
    this.getDaySales = this.getDaySales.bind(this);
  }

  componentDidMount() {
    this.getAllEntries();
  }

  getProductAverage() {
    var productTotal = 0;
    for (var i = 0; i < this.state.entries.length; i++) {
      productTotal += this.state.entries[i].entryPrice;
    }
    var average = productTotal / this.state.entries.length;
    return average;
  }

  getEntryAverage() {
    var entryTotal = 0;
    for (var i = 0; i < this.state.entries.length; i++) {
      entryTotal += (this.state.entries[i].entryPrice * this.state.entries[i].entryUnits);
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

  getTodaysEntries() {
    fetch('/api/entries/today')
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({ entries: jsonRes });
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

  setCurrentTable(table) {
    this.setState({ currentTable: table });
  }

  getDaySales(fetchDate) {
    fetch(`/api/entries/day/${'' + fetchDate}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ entries: data });
      });
  }

  render() {
    var appContext = {
      entries: this.state.entries,
      getAllEntries: this.getAllEntries,
      getTodaysEntries: this.getTodaysEntries,
      setCurrentTable: this.setCurrentTable,
      currentTable: this.state.currentTable,
      getDaySales: this.getDaySales
    };
    return (
      <AppContext.Provider value={appContext} >
        <Router>
          <Header getProductAverage={this.getProductAverage} getEntryAverage={this.getEntryAverage} />
          <Switch>

            <Route path="/details/:date"> <DateDetails /></Route>
            <Route path="/calendar" component ={CalendarContainer}/>
            <Route exact path="/chart" component={Chart}/>
            <Route path="/">
              <EntryTable deleteEntry={this.deleteEntry} />
              <EntryForm addEntry={this.addEntry} />

            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
