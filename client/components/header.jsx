import React from 'react';

function Header(props) {
  return (
    <div className="header-container d-flex ">
      <div className="title-container d-inline-block ml-5">
        <div className="header-title text-left d-inline-block">Book Master</div>
        <img className ="book-master" src="./images/bookMaster.png" alt=""/>
      </div>
      <div className="entry-average w-50 text-right">
        <div className="header-entry-average text-right d-inline-block pl-5">Price Average: <div className= "average-entry-box d-inline-block badge h-60">{props.getAverage().toFixed(2)}</div></div>
      </div>
    </div>
  );

}

export default Header;
