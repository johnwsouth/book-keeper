import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AppContext from '../context';

function Entry(props) {

  var newEntryTimeArr = props.entry.entryTime.split('T');
  var newEntryDate = newEntryTimeArr[0];
  var newEntryTime = newEntryTimeArr[1].substring(0, 8);
  return (
    <tr key={props.entry.entryID}>
      <td>{props.entry.entryName}</td>
      <td>{'$ ' + (parseFloat(props.entry.entryPrice / 100).toFixed(2))}</td>
      <td>{props.entry.entryUnits}</td>
      <td>{newEntryDate + ' - ' + newEntryTime}</td>
      <td className ="operation-cell"><button data-key={props.entry.entryID} className = "btn btn-secondary" onClick={props.deleteEntry}>Delete</button></td>
    </tr>);
}

export default class EntryTable extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div>
        <Dropdown style={{ display: 'fixed', position: 'absolute', left: '2%', top: '20%' }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.context.currentTable}
          </DropdownToggle>
          <DropdownMenu>
            {this.context.currentTable === 'All Entries'
              ? <DropdownItem disabled>{this.context.currentTable}</DropdownItem>
              : <DropdownItem onClick={() => {
                this.context.getAllEntries();
                this.context.setCurrentTable('All Entries');
              }}>{'All Entries'} </DropdownItem>}

            <DropdownItem divider />
            {this.context.currentTable === "Today's Entries"
              ? <DropdownItem disabled>{this.context.currentTable}</DropdownItem>
              : <DropdownItem onClick={() => {
                this.context.getTodaysEntries();
                this.context.setCurrentTable("Today's Entries");
              }}> {"Today's Entries"} </DropdownItem>}

          </DropdownMenu>
        </Dropdown>
        <table className="table table-secondary table-bordered">
          <thead className="thead-dark table-header">
            <tr>
              <th scope="col">Purchased product</th>
              <th scope="col">Price</th>
              <th scope="col">Units sold</th>
              <th scope="col">Entry Time</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {this.context.entries.map(entry => {
              return <Entry key= {entry.entryID} entry={entry} deleteEntry={this.props.deleteEntry}/>;
            })}
          </tbody>
        </table>
      </div>
    );
  }

}

EntryTable.contextType = AppContext;
