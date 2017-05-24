import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('songs', () => Songs.find({}));
}

Meteor.methods({
  songRate(songId, rating) {
    check(songId, String);
    check(rating, Number);
    const song = Songs.findOne(songId);
    if(!this.userId || song.submittedBy === this.userId){
      throw new Meteor.Error('not-authorized');
    }
    Songs.update(songId, { $inc: { ratingSum: rating, ratingCount: 1 }, $push: { ratedBy: this.userId} });
  },
  songInsert(name, artist, country, spotifyID) {
    check(name, String);
    //check(country, String);

    // Make sure the user is logged in before inserting a song
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Songs.insert({
      name,
      artist,
      country,
      spotifyID,
      submittedOn: new Date(),
      submittedBy: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      rating: 0,
      ratedBy: []
    });
  },
  songSearch(query) {
    HTTP.get('https://api.spotify.com/v1/search', {
      params: {"query": query, "type": 'track'}
    }, (error, result) => {
        if (!error) {
          console.log(result);
        }
      });
    // let spotifyApi = new SpotifyWebApi({
    //   clientId : process.env.SPOTIFY_CLIENTID,
    //   clientSecret : process.env.SPOTIFY_CLIENTSECRET,
    //   redirectUri : 'http://www.uniandes.edu.co'
    // });
    // console.log("Created connection");
    // spotifyApi.searchTracks(query, function(err, data) {
    //   if (err) {
    //     console.error('Something went wrong', err.message);
    //     return;
    //   }

    //   // Print some information about the results
    //   console.log('I got ' + data.body.tracks.total + ' results!');

    //   // Go through the first page of results
    //   let firstPage = data.body.tracks.items;
    //   console.log('The tracks in the first page are.. (popularity in parentheses)');

    //   firstPage.forEach(function(track, index)  {
    //     console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
    //   });
    // });
  },
});