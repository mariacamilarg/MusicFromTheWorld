import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

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
  songInsert(country, data) {
    //check(country, String);

    // Make sure the user is logged in before inserting a song
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Songs.insert({
      country,
      data,
      submittedOn: new Date(),
      submittedBy: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      rating: 0,
      ratedBy: [],
    });
  },
  songLastFM(song) {
    HTTP.get('https://ws.audioscrobbler.com/2.0/', {
      params: { method: 'track.search', track: song.data.name + ' ' + song.data.artists[0].name, api_key: process.env.LASTFM_APIKEY, format: 'json' } }, (error, result) => {
        if (!error) {
          Songs.update(song._id, { $set: { lastFm: result.data.results.trackmatches.track[0] } });
        }
      });
  },
});
