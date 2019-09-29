import React from 'react';

function Header(props) {
  return (
    <div className="header-container d-flex ">
      <div className="title-container d-inline-block ml-5">
        <div className="header-title text-left d-inline-block">Book Master</div>
        <img className ="book-master" src="./images/bookMaster.png" alt=""/>
      </div>
      <div className="entry-average w-75 text-right">
        {!isNaN(props.getEntryAverage()) && <div className="header-entry-average text-right d-inline-block pl-5 mr-3">Table Entry Average Price: <div className= "average-entry-box d-inline-block badge">{'$ ' + props.getEntryAverage().toFixed(2)}</div></div>}
        {!isNaN(props.getProductAverage()) && <div className="header-entry-average text-right d-inline-block pl-5 mr-3">Product Average Price: <div className="average-entry-box d-inline-block badge">{'$ ' + props.getProductAverage().toFixed(2)}</div></div>}
      </div>
    </div>
  );

}

export default Header;
