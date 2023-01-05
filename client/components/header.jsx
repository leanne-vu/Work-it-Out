import React from 'react';

export default function Header(props) {

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-1" />
          <div className="col-10">
            <h1 className="header">Work it Out!
              <i className="fa-solid fa-arrow-trend-up" />
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
