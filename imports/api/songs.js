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
      ratedBy: []
    });
  },
});