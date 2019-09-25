import React from 'react';
import Header from './header';
import GradeTable from './grades';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
    this.getAllEntries = this.getAllEntries.bind(this);
    this.getGradeAverage = this.getGradeAverage.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  componentDidMount() {
    this.getAllEntries();
  }

  getGradeAverage() {
    var gradeTotal = 0;
    for (var i = 0; i < this.state.entries.length; i++) {
      gradeTotal += this.state.grades[i].grade;
    }
    var average = gradeTotal / this.state.entries.length;
    return average;
  }

  getAllEntries() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.setState({ grades: jsonResponse });
      });
  }

  addEntry(newEntry) {
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then(response => response.json())
      .then(entry => {
        const newEntries = this.state.grades.concat(entry);
        this.setState({ entries: newEntries });
      });
  }

  deleteEntry(event) {
    var currentEntry = event.target.getAttribute('data-key');
    fetch(`/api/grades/${currentEntry}`, {
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
        <Header getAverage ={this.getGradeAverage}/>
        <GradeTable grades = {this.state.entries} deleteEntry = {this.deleteEntry}/>
        <GradeForm onSubmit = {this.addEntry}/>

      </React.Fragment>
    );
  }
}

export default App;
