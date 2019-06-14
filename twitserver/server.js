const express = require('express');
const app = express();
const Twitter = require('twit');
const bodyParser = require('body-parser');

const client = new Twitter({
  consumer_key: 'Ox2ZWPrXnfTYJ1BUpNRpBP13H',
  consumer_secret: 'ouebHPiPSYJKbT6ngumCa75WIRMu8eTKSiYsrLiMF4rMxmNgxQ',
  access_token: '142960350-LKUGgcci7xK5XW04CKlDxi3Cj3Z02yJf1WWceH34',
  access_token_secret: 'IvSBmO7RuxJzsQnoJH9x1GB7lMu66QOXU1hdfIHF8IUCu'
});


app.use(require('cors')());
app.use(bodyParser.json({
	limit: '50mb'
}));

app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));


app.post('/getFeed', (req, res) => {
  if(req.body && req.body.count) {
    var params = req.body.maxId ? 
    {
      count: req.body.count,
      max_id: req.body.maxId
    } : 
    { count: req.body.count };
    
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
        res.send(timeline);
      })
     .catch(error => {
       res.send(error);
    });
  } else {
    res.send("Something went wrong. Please try refreshing.");
  }
});

app.post('/getFollowers', (req, res) => {
  if(req.body) {
    var params = {
      count: 200
    }
    client
      .get('https://api.twitter.com/1.1/followers/list.json', params)
      .then(followers => {
        res.send(followers);
      })
     .catch(error => {
       res.send(error);
    });
  } else {
    res.send("Something went wrong. Please try refreshing.");
  }
});

app.post('/postTweet', (req, res) => {
  if(req.body && req.body.text) {
    var params = {
      status: req.body.text
    }
    client
      .post('https://api.twitter.com/1.1/statuses/update.json', params)
      .then(sent => {
        res.send(sent);
      })
     .catch(error => {
       res.send(error);
    });
  } else {
    res.send("Something went wrong. Please try refreshing.");
  }
});


app.listen(3000, () => console.log('Server running'));
