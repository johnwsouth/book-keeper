import React from 'react';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import { withRouter } from 'react-router-dom';

class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.onDatePicked = this.onDatePicked.bind(this);
  }

  onDatePicked(date) {
    this.props.history.push(`/details/${date._i[0] + '' + date._i[1] + date._i[2]}`);
  }

  render() {
    return (
      <div>
        <Calendar
          year={2019}
          onPickDate={this.onDatePicked}
          showWeekSeparators= {true}
        />
        <CalendarControls year = {2019}/>

      </div>);
  }
}

export default withRouter(CalendarContainer);
