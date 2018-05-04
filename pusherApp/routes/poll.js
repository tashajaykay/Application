const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '518490',
    key: '445601f6421fae734a5e',
    secret: '5f04e5eaee040f68c460',
    cluster: 'eu',
    encrypted: true
  });

  router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes }));
  });
  
  router.post('/', (req, res) => {
    const newVote = {
      os: req.body.os,
      points: 1
    }
  
    new Vote(newVote).save().then(vote => {
      pusher.trigger('os-poll', 'os-vote', {
        points: parseInt(vote.points),
        os: vote.os
      });
  
      return res.json({ success: true, message: 'Thanks for voting' });
    });
  });
  
  module.exports = router;
  