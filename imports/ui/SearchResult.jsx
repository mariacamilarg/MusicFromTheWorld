import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() { 
    return (
      <li> 
      <img src={this.props.song.album.images[1].url} alt={this.props.song.album.name} />
      <audio src={this.props.song.preview_url} controls autoplay="true"/>
        <span className="text">
        </span>
      </li>
    );
  }
}
 
Song.propTypes = {
  song: PropTypes.object.isRequired
};