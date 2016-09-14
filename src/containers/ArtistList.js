import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtists } from '../actions/asyncActions';
import SubPanel from '../components/SubPanel';
// import { browserHistory } from 'react-router';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.params.term
    }
    this.initialRoute = this.props.params.term;
  }
  componentDidMount() {
    console.log('artist list will mount!!');
    this.props.getArtists(this.props.params.term);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   //if old artists are different from new artists
  //     //true
  //   if (this.props.params !== nextProps.params ) {
  //
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // componentDidUpdate() {
  //   this.props.getArtists(this.props.params.term);
  //   console.log(this.props);
  // }
  render() {
    return (
      <div className="artist-list">
        {
          this.props.artists.map((artist, i) => {
            const image = artist.image[2][Object.keys(artist.image[2])[0]];
            return <SubPanel name={artist.name} key={i} img={image}/>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.searchArtists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtists: (term) => dispatch(getArtists(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList) ;
