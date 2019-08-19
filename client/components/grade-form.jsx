import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeGrade = this.handleChangeGrade.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleChangeCourse(event) {
    this.setState({
      course: event.target.value
    });
  }
  handleChangeGrade(event) {
    this.setState({
      grade: event.target.value
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: parseFloat(this.state.grade)
    };
    this.props.onSubmit(newGrade);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {

    return (
      <form className="mb-4 shadow-md form-container" onSubmit={this.handleSubmit} >
        <i className="fas fa-user-edit icon-name icon"></i>
        <input
          required
          autoFocus
          type="text"
          value={this.state.name}
          className="form-control form"
          placeholder="Enter a name"
          onChange={this.handleChangeName} />
        <i className="fas fa-book icon-course icon"></i>
        <input
          required
          autoFocus
          type="text"
          value={this.state.course}
          className="form-control form"
          placeholder="Enter a course"
          onChange={this.handleChangeCourse} />
        <i className="fas fa-medal icon-grade icon"></i>
        <input
          required
          autoFocus
          type="text"
          value={this.state.grade}
          className="form-control form"
          placeholder="Enter a grade"
          onChange={this.handleChangeGrade} />
        <div className="mt-3">
          <button type="submit" className="btn btn-dark">Add Grade</button>
          <button type="cancel" className="btn btn-secondary ml-3" onClick={this.handleCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
