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
  }
  componentDidMount() {
    this.getAllStudents();
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
        <Header />
        <GradeTable grades = {this.state.grades}/>
      </React.Fragment>
    );
  }
}

export default App;
