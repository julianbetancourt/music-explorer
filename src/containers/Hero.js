import React, { Component } from 'react';

class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <div className="hero__content">
          <h1>Music Explorer</h1>
          <h2>Get information about an artist or the most played ones in a specific country</h2>
          <div className="main-form">
            <form className="main-form__input">
              <input type="text" placeholder="How about blink-182 or Australia?" />
              <button type="submit"><i className="ion-ios-search-strong"></i></button>
              <button type="submit">Search</button>
            </form>
            <form className="main-form__select">
              <div className="main-form__select__item">
                <input type="radio" name="search" value="artist" id="select-artist" /><label htmlFor="select-artist">Artist</label>
              </div>
              <div className="main-form__select__item">
                <input type="radio" name="search" value="country" id="select-country" /><label htmlFor="select-country">Country</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
