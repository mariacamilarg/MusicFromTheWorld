import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Meteor } from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import { HTTP } from 'meteor/http';

import { Songs } from '../api/songs.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Song from "./Song.jsx";

export class MyLists extends Component {
  constructor(props) {
    super(props);
  }

  renderSongs() {
    //let filteredSongs = this.props.songs.filter(song => song.creator !== this.props.currentUser);
    return this.props.songs.map( (song) => {
      if (song.submittedBy === this.props.currentUser._id) {
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
      }
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
                    <h2><b>music from the world</b></h2>
    							</div>
									<div className="col-md-2">
                    <AccountsUIWrapper />
                  </div>
    							<div className="clearfix"> </div>
    						</div>
    					</div>
    					<div className="clearfix"></div>
    				</div>

            <div className ="app-container">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <h2>The songs you have added:</h2>
                    </div>
                    <div className="col-md-6">

                    </div>
                  </div>
                  <br />
                  <ul>
                    {this.renderSongs()}
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

export default createContainer(() => {
  Meteor.subscribe('songs');
  return {
    songs: Songs.find({}, { sort: { ratingCount: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, MyLists);
