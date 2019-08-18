import React from 'react';
import Header from './header';
import GradeTable from './grades';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.getAllStudents = this.getAllStudents.bind(this);
    this.getGradeAverage = this.getGradeAverage.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <Header getAverage ={this.getGradeAverage} />
        <GradeTable grades = {this.state.grades}/>
      </React.Fragment>
    );
  }
}

export default App;
