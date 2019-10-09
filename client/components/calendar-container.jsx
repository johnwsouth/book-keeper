import React from 'react';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
/* CalendarControls */

export default class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.onDatePicked = this.onDatePicked.bind(this);
  }

  onDatePicked(date) {
    alert(date);
  }

  render() {
    return (
      <div>
        <Calendar
          year={2019}
          onPickDate={this.onDatePicked}
          showWeekSeparators= {true}
        />
        <CalendarControls showTodayButton= {true}/>

      </div>);
  }
}
