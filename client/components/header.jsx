import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className="header-padding">
      <div className="header-container">
        <div className="title-container d-inline-block ml-5">
          <div className="header-title text-left d-inline-block"><Link to="/">Book Master</Link></div>
          <img className ="book-master" src="/images/bookMaster.png" alt=""/>
        </div>

        <div className="entry-average text-right">
          {!isNaN(props.getEntryAverage()) && <div className="header-entry-average text-right d-inline-block ">Table Entry Average Price: <div className="average-entry-box d-inline-block badge">{'$ ' + (props.getEntryAverage() / 100).toFixed(2)}</div></div>}
          {!isNaN(props.getProductAverage()) && <div className="header-entry-average text-right d-inline-block ml-5 mr-5">Product Average Price: <div className="average-entry-box d-inline-block badge">{'$ ' + (props.getProductAverage() / 100).toFixed(2)}</div></div>}
        </div>
        <Link to='/chart'><i className="far fa-chart-bar mr-5 mt-3"></i></Link>
        <Link to='/calendar'><i className="far fa-calendar-alt mr-5 mt-3"></i></Link>
      </div>
    </div>
  );

}

export default Header;
