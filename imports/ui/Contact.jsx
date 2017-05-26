import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Meteor } from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import { HTTP } from 'meteor/http';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Contact extends Component {

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

            <div className ="row contact-container">
              <br />
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <h3>Find Us </h3>
                <br />
                <iframe className="map-frame" src="https://maps.google.com/maps?q=4.6027795,-74.067091&hl=es;z=14&amp;output=embed"></iframe>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4">
                <h3>Social Websites</h3>
                <br />
                <p>
                  <a href="https://webdevuniandes.github.io/camendoza94/camendoza94/homepage/public_html/index.html">Camilo Alejandro Mendoza Arrieta</a>
                </p>
                <p>
                  <a href="https://mariacamilaremolinagutierrez.github.io/">Maria Camila Remolina Gutierrez</a>
                </p>
              </div>
              <div className="col-md-1"></div>
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

export default Contact;
