import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      comment: '',
      playing: false
    };
  }

  handleAdd(event) {
    event.preventDefault();
    Meteor.call('songInsert', this.state.country, this.props.song);
  }

  handleCountryChange(event) {
    this.setState({country: event.target.value});
  }

  playAudio() {
    if(this.state.playing) {
      this.setState({playing: false});
      this.audio.pause(); 
    } else {
      this.setState({playing: true});
      this.audio.play();
    }
  }

  isPlaying() {
    if(this.state.playing)
      return "playing";
    return ""; 
  }

  render() { 
    return (
      <li className="col-lg-3 col-md-4 col-sm-12">
        <div className="searchResult">
          <img className={this.isPlaying()} src={this.props.song.album.images[2].url} alt={this.props.song.album.name} onClick={() => this.playAudio()} />
          <audio src={this.props.song.preview_url} controls hidden onEnded={() => this.playAudio()} ref={(audio) => { this.audio = audio; }}/>
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