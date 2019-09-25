import React from 'react';
import Header from './header';
import GradeTable from './grades';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.getAllStudents = this.getAllStudents.bind(this);
    this.getGradeAverage = this.getGradeAverage.bind(this);
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getGradeAverage() {
    var gradeTotal = 0;
    for (var i = 0; i < this.state.grades.length; i++) {
      gradeTotal += this.state.grades[i].grade;
    }
    var average = gradeTotal / this.state.grades.length;
    return average;
  }

  getAllStudents() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.setState({ grades: jsonResponse });
      });
  }

  addGrade(newGrade) {
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrade)
    })
      .then(response => response.json())
      .then(grade => {
        const newGrades = this.state.grades.concat(grade);
        this.setState({ grades: newGrades });
      });
  }

  deleteGrade(event) {
    var currentGrade = event.target.getAttribute('data-key');
    fetch(`/api/grades/${currentGrade}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        var newGradesArray = this.state.grades.map(gradeObject => {
          if (gradeObject.id === currentGrade) {
            return;
          }
          return gradeObject;
        }).then(() => {
          this.setState({ newGradesArray });
        });
      });
  }

  render() {

    return (
      <React.Fragment>
        <Header getAverage ={this.getGradeAverage}/>
        <GradeTable grades = {this.state.grades} deleteGrade = {this.deleteGrade}/>
        <GradeForm onSubmit = {this.addGrade}/>

      </React.Fragment>
    );
  }
}

export default App;
