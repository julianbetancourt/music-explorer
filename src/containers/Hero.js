import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleFilter } from '../actions/asyncActions';

class HeroRouter extends Component {
  handleFilterChange(e) {
    if (e.currentTarget.value !== this.props.filter) {
      this.props.toggleFilter();
    }
  }
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
                <input type="radio" name="search" value="artist" id="select-artist" checked={this.props.filter === 'artist'} onChange={this.handleFilterChange.bind(this)}/><label htmlFor="select-artist">Artist</label>
              </div>
              <div className="main-form__select__item">
                <input type="radio" name="search" value="country" id="select-country" checked={this.props.filter === 'country'} onChange={this.handleFilterChange.bind(this)}/><label htmlFor="select-country">Country</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilter: () => dispatch(toggleFilter())
  }
}


let Hero = withRouter(HeroRouter);


export default connect(mapStateToProps, mapDispatchToProps)(Hero);
