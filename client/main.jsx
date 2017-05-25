import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

//UI Components
import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
import Browse from '../imports/ui/Browse.jsx';
import Contact from '../imports/ui/Contact.jsx';
import MyLists from '../imports/ui/MyLists.jsx';

//CSS
import './main.html';
import '../public/css/bootstrap.css';
import '../public/css/style.css';
import '../public/css/font-awesome.css';
import '../public/css/icon-font.css';
import '../public/css/audio.css';

//JS
import './js/jquery-2.1.4.js';
import './js/jquery.flexisel.js';
import './js/jquery.nicescroll.js';
import './js/jquery.magnific-popup.js';
import './js/jquery.jplayer.min.js';
import './js/bootstrap.js';
import './js/classie.js';
import './js/easyResponsiveTabs.js';
import './js/jplayer.playlist.min.js';
import './js/mediaelement-and-player.min.js';
import './js/responsiveslides.min.js';
import './js/scripts.js';
import './js/uisearch.js';


Meteor.startup(() => {
  $('html').attr('lang', 'en');
  render(
    <Router history={ browserHistory } >
      <Route path='/' component={ App }>
        <Route path="browse" component={ Browse }/>
        <Route path="mylists" component={ MyLists }/>
        <Route path="contact" component={ Contact }/>
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
