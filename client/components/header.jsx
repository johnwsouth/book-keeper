import React from 'react';

function Header(props) {
  return (
    <div className="header-container d-flex ">
      <div className="d-inline-block ml-5">
        <div className="header-title text-left d-inline-block">Student Grade Table</div>
      </div>
      <div className="grade-average w-50 text-right">
        <div className="header-grade-average text-right d-inline-block pl-5">Average Grade: <div className= "average-grade-box d-inline-block badge h-60">{props.getAverage().toFixed(2)}</div></div>
      </div>
    </div>
  );

}

export default Header;
