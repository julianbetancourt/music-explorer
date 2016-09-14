import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFilter, getArtists } from '../actions/asyncActions';

class HeroRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }
  handleInputChange(e) {
    e.preventDefault();
    this.setState({term: e.target.value})
  }
  handleFilterChange(e) {
    if (e.currentTarget.value !== this.props.filter) {
      this.props.toggleFilter();
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.router.replace('/search/' + this.state.term)
    this.props.getArtists(this.state.term);
    this.setState({term: ''});

  }
  render() {
    return (
      <div className="hero">
        <div className="hero__content">
          <h1><Link to="/">Music Explorer</Link></h1>
          <h2>Get information about an artist or the most played ones in a specific country</h2>
          <div className="main-form">
            <form className="main-form__input" onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="How about blink-182 or Australia?" value={this.state.term} onChange={this.handleInputChange.bind(this)}/>
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
    filter: state.filter,
    artists: state.searchArtists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilter: () => dispatch(toggleFilter()),
    getArtists: (term) => dispatch(getArtists(term))
  }
}


let Hero = withRouter(HeroRouter);


export default connect(mapStateToProps, mapDispatchToProps)(Hero);
