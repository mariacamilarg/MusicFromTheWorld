import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRating: 0,
      playing: false,
      lastFm: {},
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('songRate', this.props.song._id, Number(this.state.userRating));
  }

  playAudio() {
    if (this.state.playing) {
      this.setState({ playing: false });
      this.audio.pause();
    } else {
      this.setState({ playing: true });
      this.audio.play();
    }
  }

  isPlaying() {
    if (this.state.playing) {
      return 'playing';
    }
    return '';
  }

  componentDidMount() {
    HTTP.get('https://ws.audioscrobbler.com/2.0/', {
      params: { method: 'track.search', track: this.props.song.data.name + ' ' + this.props.song.data.artists[0].name, api_key: '6a3cf18c95f7ec66d67daaba31c307f7', format: 'json' } }, (error, result) => {
        if (!error) {
          console.log(result);
          this.setState({ lastFm: result.data.results.trackmatches.track[0] });
        }
      });
  }

  handleChange(event) {
    this.setState({ userRating: event.target.value });
  }

  render() {
    return (
      <li className="col-lg-4 col-md-6 col-sm-12">
        <div>
          <img className={this.isPlaying()} src={this.props.song.data.album.images[1].url} alt={this.props.song.data.album.name} onClick={this.playAudio.bind(this)} />
          <audio src={this.props.song.data.preview_url} controls hidden onEnded={() => this.playAudio()} ref={(audio) => { this.audio = audio; }} />
          <div className="songInfo">
            <h3>{this.props.song.data.name + " by " +  this.props.song.data.artists[0].name} </h3>
          </div>
        </div>
        <span className="text">
          <strong>Submited by: {this.props.song.username}</strong>; rating: {(this.props.song.ratingSum/this.props.song.ratingCount) || 0.0}
        </span>
        { this.state.lastFm ?
          <a href={this.state.lastFm.url}>
            <img src="img/lastfm_red_small.gif" alt="Last.fm logo" />
          </a> : ''
        }
        { this.props.currentUser && !this.props.sameUser ?
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Select your rating for this song"
              onChange={this.handleChange.bind(this)}
              disabled={this.props.sameUser || this.props.song.ratedBy.indexOf(this.props.currentUser._id) !== -1 }
            />
          </form> : ''
        }
      </li>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  sameUser: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
};
