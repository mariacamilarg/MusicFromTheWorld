import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactAudioPlayer from 'react-audio-player';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      comment: ''
    };
  }

  handleAdd(event) {
    event.preventDefault();
    Meteor.call('songInsert', this.props.song.name, this.props.song.artists[0].name, this.state.country, this.props.song.id);
  }

  handleCountryChange(event) {
    this.setState({country: event.target.value});
  }

  render() { 
    return (
      <li className="col-lg-4 col-md-6 col-sm-12">
        <div className="searchResult">
          <img src={this.props.song.album.images[2].url} alt={this.props.song.album.name} />
          <ReactAudioPlayer src={this.props.song.preview_url} controls controlsList="nodownload"/>
          <div className="songInfo">
            <h3>{this.props.song.name + " by " +  this.props.song.artists[0].name} </h3>
          </div>
          <form className="submit" onSubmit={(event) => this.handleAdd(event)} >
            Country: <input
              type="text"
              value = {this.state.country}
              placeholder="Add this song's country"
              onChange={(event) => this.handleCountryChange(event)}
            />
          <input type="submit" value="Post"/>
          </form>
        </div>
      </li>
    );
  }
}
 
SearchResult.propTypes = {
  song: PropTypes.object.isRequired
};