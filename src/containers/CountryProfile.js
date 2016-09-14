import React, { Component } from 'react';

class CountryProfile extends Component {
  render() {
    return (
      <div className="country-profile">
        <h1>Country: {this.props.params.country}</h1>
      </div>
    );
  }
}

export default CountryProfile;
