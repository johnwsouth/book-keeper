import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AppContext from '../context.js';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    var fetchDate = format(date, 'yyyy-MM-dd');
    this.context.setCurrentTable('Custom Date');
    this.context.getDaySales(fetchDate);
    this.setState({
      startDate: date
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      <Dropdown style={{ display: 'inline-block', position: 'fixed', right: '8vmin', top: '3vmin', zIndex: '1' }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.context.currentTable}
        </DropdownToggle>
        <DropdownMenu>
          {this.context.currentTable !== 'All Entries'
            ? <DropdownItem onClick={() => {
              this.context.getAllEntries();
              this.context.setCurrentTable('All Entries');
            }}>{'All Entries'} </DropdownItem>
            : <DropdownItem disabled>{this.context.currentTable}</DropdownItem>}

          <DropdownItem divider />
          {this.context.currentTable !== "Today's Entries"
            ? <DropdownItem onClick={() => {
              this.context.getTodaysEntries();
              this.context.setCurrentTable("Today's Entries");
            }}> {"Today's Entries"} </DropdownItem>
            : <DropdownItem disabled>{this.context.currentTable}</DropdownItem>}

        </DropdownMenu>
      </Dropdown>

      </>

    );
  }
}

DateInput.contextType = AppContext;
