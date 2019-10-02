import React from 'react';
function Entry(props) {
  return (
    <tr key={props.entry.entryID}>
      <td>{props.entry.entryName}</td>
      <td>{'$ ' + (parseFloat(props.entry.entryPrice / 100))}</td>
      <td>{props.entry.entryUnits}</td>
      <td className ="operation-cell"><button data-key={props.entry.entryID} className = "btn btn-secondary" onClick={props.deleteEntry}>Delete</button></td>
    </tr>);
}

function EntryTable(props) {
  return (
    <table className="table table-dark table-striped table-bordered">
      <thead className= "thead-light table-header">
        <tr>
          <th scope="col">Purchased product</th>
          <th scope="col">Price</th>
          <th scope="col">Units sold</th>
          <th scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map(entry => {
          return <Entry key= {entry.entryID} entry={entry} deleteEntry={props.deleteEntry}/>;
        })}
      </tbody>
    </table>
  );

}

export default EntryTable;
