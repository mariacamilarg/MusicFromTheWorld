import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRating: 0
    };
  }

  handleChange(event) {
    this.setState({userRating: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('songsRate', this.props.song._id, Number(this.state.userRating));
  }

  render() { 
    return (
      <li> 
        <span className="text">
          <strong>{this.props.song.username}</strong>: {this.props.song.name}; rating: {(this.props.song.ratingSum/this.props.song.ratingCount) || 0.0}
        </span>
        { this.props.currentUser ?
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
  currentUser: PropTypes.object
};