import React, { Component } from 'react';
import { Link } from "react-router";

export default class HomePage extends Component {
  render() {
    return (
      <div className="jumbptran">
        <h1>MMS Administartion</h1>
        <p>Manage all Stocks and Credits of the Clients.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}
