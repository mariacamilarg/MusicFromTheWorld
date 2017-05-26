import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRating: 0,
      playing: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('songRate', this.props.song._id, Number(this.state.userRating));
  }

  playAudio(event) {
    event.preventDefault();
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
    Meteor.call('songLastFM', this.props.song);
  }

  handleChange(event) {
    console.log("hola");
    console.log(this.props.song);
    Meteor.call('songRate', this.props.song._id, Number(event.target.value));
    console.log(this.state);
    console.log(this.props.song);
  }

  render() {
    return (
      <div className="song-display col-lg-4 col-md-6 col-sm-12">
        <div className="row">
          <img className="song-img" src={this.props.song.data.album.images[1].url} alt={this.props.song.data.album.name} />
        </div>
        <br />
        <div className="row">
          <div className="col-md-2 song-play">
            <form onSubmit={(event) => this.playAudio(event)} >
              <input type="image" className="song-img-mini" name="submit" src="/img/play.png" alt="Play Song" />
              <audio src={this.props.song.data.preview_url} controls hidden onEnded={() => this.playAudio()} ref={(audio) => { this.audio = audio; }}/>
            </form>
          </div>
          <div className="col-md-2 song-pause">
            <form onSubmit={(event) => this.playAudio(event)} >
              <input type="image" className="song-img-mini" name="submit" src="/img/pause.png" alt="Pause Song" />
              <audio src={this.props.song.data.preview_url} controls hidden onEnded={() => this.playAudio()} ref={(audio) => { this.audio = audio; }}/>
            </form>
          </div>
          <div className="col-md-8 song-info">
            <p> <b> {this.props.song.data.name} </b> </p>
            <p>{this.props.song.data.artists[0].name} </p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-8">
            <span className="text">
              <strong>Rating: </strong>  &nbsp; {(this.props.song.ratingSum/this.props.song.ratingCount) || 0.0}
            </span>
          </div>
          <div className="col-md-4">
            { this.props.currentUser && !this.props.sameUser ?
              <select className="song-country" onChange={(event) => this.handleChange(event)} >
                <option value default>--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select> : ''
            }
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-8">
            <span className="text">
              <strong>Submited by: </strong> &nbsp; {this.props.song.username}
            </span>
          </div>
          <div className="col-md-4">
            { this.props.song.lastFm ?
              <a className="center" href={ this.props.song.lastFm.url}>
                <img src="img/lastfm_red_small.gif" alt="Last.fm logo" />
              </a> : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  sameUser: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
};
