import React from 'react';
function Grade(props) {
  return (
    <tr key={props.grade.id}>

      <td>{props.grade.name}</td>
      <td>{props.grade.course}</td>
      <td>{props.grade.grade}</td>

    </tr>);
}
function GradeTable(props) {
  return (
    <table className=" table table-dark table-striped table-bordered ">
      <thead className= "thead-light table-header">
        <tr>
          <th scope="col">Student Name</th>
          <th scope="col">Course </th>
          <th scope="col">Grade</th>

        </tr>
      </thead>
      <tbody>
        {props.grades.map(grade => {
          return <Grade key= {grade.id} grade={grade} />;

        })}
      </tbody>
    </table>
  );

}

export default GradeTable;
