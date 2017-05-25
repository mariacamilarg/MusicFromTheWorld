import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Meteor } from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import { HTTP } from 'meteor/http';

import { Songs } from '../api/songs.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import SearchResult from "./SearchResult.jsx";
import Song from "./Song.jsx";


class Browse extends Component {
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
    				  <div className="menu-right">
                <div className="profile_details">
                  <div className="col-md-1">
    							</div>
    						  <div className="col-md-9">
                    <h2>music from the world</h2>
    							</div>
									<div className="col-md-2">
                    <AccountsUIWrapper />
                  </div>
    							<div className="clearfix"> </div>
    						</div>
    					</div>
    					<div className="clearfix"></div>
    				</div>

            <div className ="browse-container">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <h2>Browse for songs:</h2>
                    </div>
                    <div className="col-md-8">
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
                    </div>
                  </div>
                  <br />
                  <ul>
                    {this.renderResults()}
                  </ul>
                </div>
                <div className="col-md-1"></div>
              </div>

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

Browse.propTypes = {
  songs: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('songs');
  return {
    songs: Songs.find({}, { sort: { ratingCount: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, Browse);
