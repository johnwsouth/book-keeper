import React from 'react';
import { withRouter } from 'react-router-dom';

class DateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDate: this.props.match.params.date
    };

  }

  render() {
    return (
      <h1 style={{ position: 'absolute', top: '50%' }}>Im the date {this.props.match.params.date}</h1>
    );
  }
}

export default withRouter(DateDetails);
