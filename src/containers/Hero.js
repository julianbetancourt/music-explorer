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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    e.preventDefault();
    this.setState({term: e.target.value})
  }
  handleSubmit(e) {
    const { filter, router, getArtists } = this.props;
    e.preventDefault();
    if (filter === 'artist') {
      router.replace('/search/' + this.state.term)
    } else {
      router.replace('/' + filter + '/' + this.state.term)
    }
    getArtists(this.state.term);
    this.setState({term: ''});
  }
  render() {
    return (
      <div className="hero">
        <div className="hero__content">
          <h1><Link to="/">Music Explorer</Link></h1>
          <h2>Type a singer or band and get information, similar artists and popular songs!</h2>
          <div className="main-form">
            <form className="main-form__input" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="How about Major Lazer?" value={this.state.term} onChange={this.handleInputChange}/>
              <button type="submit"><i className="ion-ios-search-strong"></i></button>
              <button type="submit">Search</button>
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
