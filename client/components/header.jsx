import React from 'react';

function Header(props) {
  return (
    <div className="header-container d-flex">
      <div className="header-title ml-5 text-center">Student Grade Table</div>
      <div className="header-grade-average"></div>
    </div>
  );
}

export default Header;
