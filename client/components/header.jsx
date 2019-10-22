import React from 'react';
import { Link } from 'react-router-dom';
import DateInput from './date-input';

function Header(props) {
  return (
    <div className="header-padding">
      <div className="header-container">
        <div className="title-container d-inline-block">
          <div className="header-title text-left d-inline-block"><Link to="/">Book Master</Link></div>
          <Link to="/"><img className="book-master" src="/images/bookMaster.png" alt=""/></Link>
        </div>

        <div className="entry-average">
          {!isNaN(props.getEntryAverage()) && <div className="header-entry-average  d-inline-block ">Table Entry Average Price: <div className="average-entry-box d-inline-block badge">{'$ ' + (props.getEntryAverage() / 100).toFixed(2)}</div></div>}
          {!isNaN(props.getProductAverage()) && <div className="header-entry-average d-inline-block">Product Average Price: <div className="average-entry-box d-inline-block badge">{'$ ' + (props.getProductAverage() / 100).toFixed(2)}</div></div>}
        </div>
        <Link to='/chart'><i className="far fa-chart-bar nav-icon nav-chart"></i></Link>
        <Link to='/calendar'><i className="far fa-calendar-alt nav-icon nav-calendar"></i></Link>
        <DateInput />

      </div>
    </div>
  );

}

export default Header;
