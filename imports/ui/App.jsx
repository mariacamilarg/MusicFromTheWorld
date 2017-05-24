import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import { HTTP } from 'meteor/http';
import { Songs } from '../api/songs.js';


import Song from "./Song.jsx";
import SearchResult from "./SearchResult.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export class App extends Component {
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
    console.log("Query is: " + event.target.value);
    HTTP.get('https://api.spotify.com/v1/search', {
      params: {"query": event.target.value, "type": 'track'}
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

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('songInsert', event.target.value);
  }
  renderSongs() {
    //let filteredSongs = this.props.songs.filter(song => song.creator !== this.props.currentUser);
    return this.props.songs.map( (song) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const sameUser = song.creator === currentUserId;
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
        <h1>PeerGrader</h1>
        <AccountsUIWrapper />
        { this.props.currentUser ?
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              value = {this.props.desc}
              placeholder="Type to search for new songs"
              onChange={this.handleChange.bind(this)}
            />
          </form> : ''
        }

        { this.props.currentUser ?
          <form className="new-task" onSubmit={(event) => this.handleSearchSubmit(event)} >
            <input
              type="text"
              value = {this.props.desc}
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

App.propTypes = {
  songs: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};


export default AppContainer = createContainer(()=>{
  Meteor.subscribe('songs');
  return {
    songs: Songs.find({}, { sort: { ratingCount: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, App);