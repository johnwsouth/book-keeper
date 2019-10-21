import React from 'react';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import { withRouter } from 'react-router-dom';

class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      currentYear: 2019
    };
    this.onDatePicked = this.onDatePicked.bind(this);
    this.goToPrevYear = this.goToPrevYear.bind(this);
    this.goToNextYear = this.goToNextYear.bind(this);
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

  goToPrevYear() {
    var prevYear = this.state.currentYear - 1;
    this.setState({ currentYear: prevYear });
  }

  goToNextYear() {
    var nextYear = this.state.currentYear + 1;
    this.setState({ currentYear: nextYear });
  }

  render() {
    return (
      <div>
        <Calendar
          year={this.state.currentYear}
          onPickDate={this.onDatePicked}
          showWeekSeparators= {true}
        />
        <CalendarControls year = {this.state.currentYear} onPrevYear = {this.goToPrevYear} onNextYear={this.goToNextYear}/>

      </div>);
  }
}

export default withRouter(CalendarContainer);
