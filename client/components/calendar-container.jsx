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
    var chosenMonth = date._i[1] + 1;
    var chosenDay = date._i[2];
    var newMonth;
    var newDay;
    if (chosenMonth < 10) {
      newMonth = '0' + chosenMonth;
    } else {
      newMonth = '' + chosenMonth;
    }
    if (chosenDay < 10) {
      newDay = '0' + chosenDay;
    } else {
      newDay = '' + chosenDay;
    }
    this.props.history.push(`/details/${'' + date._i[0] + '-' + newMonth + '-' + newDay}`);
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
