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

            <div className ="contact-container">
              <div class="inner-content">
                <div class="tittle-head">
                  <h3 class="tittle">Find Us </h3>
                  <div class="clearfix"> </div>
                </div>
                <div class="contact">
                  <div class="contact-left">
                    <iframe src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Purwokerto,+Central+Java,+Indonesia&amp;aq=0&amp;oq=purwo&amp;sll=37.0625,-95.677068&amp;sspn=50.291089,104.238281&amp;ie=UTF8&amp;hq=&amp;hnear=Purwokerto,+Banyumas,+Central+Java,+Indonesia&amp;ll=-7.431391,109.24783&amp;spn=0.031022,0.050898&amp;t=m&amp;z=14&amp;output=embed"></iframe>
                  </div>
                  <div class="contact-right">
                    <p class="phn">+9100 2481 5842</p>
                    <p class="phn-bottom">4578 Marmora <span>Road, Glasgow D04 89GR</span></p>
                    <p class="lom">
                      Nullam ac urna velit. Pellentesque in arcu tortor.
                      Pellentesque nec est et elit varius pulvinar eget vitae sapien.
                      Aenean vehicula accumsan gravida.
                    </p>
                  </div>
                  <div class="clearfix"> </div>
                  <div class="contact-left1">
                    <h3>Contact Us With <span>Any questions</span></h3>
                    <div class="in-left">
                      <form action="#" method="post">
                        <p class="your-para">Your Name :</p>
                        <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}" required="" />
                        <p class="your-para">Your Mail :</p>
                        <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}" required="" />
                        <p class="your-para">Phone Number:</p>
                        <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}" required="" />
                      </form>
                    </div>
                    <div class="in-right">
                      <form>
                        <textarea placeholder="" onfocus="this.value='';" onblur="if (this.value == '') {this.value = '';}" required=""></textarea>
                        <input type="submit" value="Submit" />
                      </form>
                    </div>
                    <div class="clearfix"> </div>
                  </div>
                  <div class="contact-right1">
                    <h3><span>Social Websites</span></h3>
                    <h4>
                      Nullam ac urna velit pellentesque in <label>arcu tortor
                      Pellentesque nec</label>
                    </h4>
                    <p>
                      Nullam ac urna velit. Pellentesque in arcu tortor.
                      Pellentesque nec est et elit varius pulvinar eget vitae sapien.
                      Aenean vehicula accumsan gravida. Cum sociis natoque penatibus
                      et magnis dis parturient montes, nascetur ridiculus mus. Phasellus
                      et lectus in urna consequat consectetur ut eget risus.
                    </p>
                    <ul class=" side-icons con">
                      <li><a class="fb" href="#"></a></li>
                      <li><a class="twitt" href="#"></a></li>
                      <li><a class="goog" href="#"></a></li>
                      <li><a class="drib" href="#"></a></li>
                    </ul>
                  </div>
                  <div class="clearfix"> </div>
                </div>
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

export default Contact;
