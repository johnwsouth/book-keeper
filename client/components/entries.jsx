import React from 'react';
function Entry(props) {
  return (
    <tr key={props.entry.id}>
      <td>{props.entry.productName}</td>
      <td>{props.entry.price}</td>
      <td>{props.entry.units}</td>
      <td className ="operation-cell"><button data-key={props.entry.id} className = "btn btn-secondary" onClick={props.deleteEntry}>Delete</button></td>
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
          return <Entry key= {entry.id} entry={entry} deleteEntry={props.deleteEntry}/>;
        })}
      </tbody>
    </table>
  );

}

export default EntryTable;
