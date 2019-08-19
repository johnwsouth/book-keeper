import React from 'react';
function Grade(props) {
  return (
    <tr key={props.grade.id}>

      <td>{props.grade.name}</td>
      <td>{props.grade.course}</td>
      <td>{props.grade.grade}</td>
      {/* <button type="cancel" className="btn btn-secondary ml-3" onClick={this.handleCancel}>Cancel</button> */}
      <td className ="operation-cell"><button data-key={props.grade.id} className = "btn btn-secondary" onClick={props.deleteGrade}>Delete</button></td>

    </tr>);
}

function GradeTable(props) {
  return (
    <table className=" table table-dark table-striped table-bordered">
      <thead className= "thead-light table-header">
        <tr>
          <th scope="col">Student Name</th>
          <th scope="col">Course </th>
          <th scope="col">Grade</th>
          <th scope="col">Operation</th>

        </tr>
      </thead>
      <tbody>
        {props.grades.map(grade => {
          return <Grade key= {grade.id} grade={grade} deleteGrade={props.deleteGrade}/>;

        })}
      </tbody>
    </table>
  );

}

export default GradeTable;
