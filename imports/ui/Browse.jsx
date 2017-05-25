import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      search: []
    };
  }

  handleSearchChange(event) {
    this.setState({query: event.target.value});
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    HTTP.get('https://api.spotify.com/v1/search', {
      params: {query: this.state.query, type: 'track', limit: '15'}
    }, (error, result) => {
      if (!error) {
        console.log(result);
        this.setState({search: result.data.tracks.items});
      }
    });
  }

  handleChange(event) {
    this.setState({desc: event.target.value});
  }

  renderSongs() {
    //TODO Organizarlos por país. Cambiar a thumbs up/down?
    //let filteredSongs = this.props.songs.filter(song => song.creator !== this.props.currentUser);
    return this.props.songs.map( (song) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const sameUser = song.submittedBy === currentUserId;
      return (
        <Song
          key= {song._id}
          song={song}
          sameUser={sameUser}
          currentUser={this.props.currentUser}
        />
      );
    });
  }

  renderResults() {
    return this.state.search.map( (song) => {
      return (
        <SearchResult
          key= {song.id}
          song={song}
        />
      );
    });
  }

  render() {
    return(
      <div className ="container">
        { this.props.currentUser ?
          <form className="new-task" onSubmit={(event) => this.handleSearchSubmit(event)} >
            <input
              type="text"
              value = {this.state.query}
              placeholder="Type to search for new songs"
              onChange={(event) => this.handleSearchChange(event)}
            />
          </form> : ''
        }
        <h2>Results:</h2>
        <ul>
          {this.renderResults()}
        </ul>
        <h2>Songs:</h2>
        <ul>
          {this.renderSongs()}
        </ul>
        <h2>Your favorites:</h2>
        <div>Your faves</div>
        <h2>Overall most voted</h2>
        <div>Most voted</div>
      </div>
    );
  }
}

Browse.propTypes = {
  songs: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};
