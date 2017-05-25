import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
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
      <div className="sticky-header left-side-collapsed">
        <section>
          <div className="left-side sticky-left-side" id="navbar">
            <div className="logo">
              <h1>MFTW</h1>
      			</div>
      			<div className="logo-icon text-center">
              <Link to={'/'}><span>M</span></Link>
      			</div>

      			<div className="left-side-inner">
              <ul className="nav nav-pills nav-stacked custom-nav">
                <li><Link to={'/'}><i className="lnr lnr-home"></i><span>Home</span></Link></li>
                <li><Link to={'/browse'}><i className="lnr lnr-indent-increase"></i><span>Browse</span></Link></li>
                <li><Link to={'/mylists'}><i className="lnr lnr-music-note"></i><span>My Lists</span></Link></li>
                <li><Link to={'/contact'}><i className="lnr lnr-pencil"></i><span>Contact</span></Link></li>
      				</ul>
      			</div>
          </div>

    		  <div className="main-content">
            <div className="header-section">
              <a className="toggle-btn menu-collapsed" data-toggle="toggle-btn" data-target="#navbar"><i className="fa fa-bars"></i></a>
    				  <div className="menu-right">
                <div className="profile_details">
                  <div className="col-md-1">
    							</div>
    						  <div className="col-md-9">
                    <h1>Music from the World</h1>
    							</div>
									<div className="col-md-2">
                    <AccountsUIWrapper />
                  </div>
    							<div className="clearfix"> </div>
    						</div>
    					</div>
    					<div className="clearfix"></div>
    				</div>

            <div className ="container">
              <h1>Music from the World</h1>
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

    			  <footer>
              <p>Mosaic 2016. All Rights Reserved | Design by <a href="https://w3layouts.com/" target="_blank">w3layouts.</a></p>
    			  </footer>
          </div>
        </section>
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
