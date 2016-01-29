var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function(req,res){
  var returnData = {}
  return knex.select().table('posts')
  .then(function(results){
    returnData.posts = results;
  })
  .then(function(){
    return knex.select().table('comments')
    .then(function(results){
      returnData.comments = results;
    })
  })
  .then(function(){
    return knex.select().table('ranking').avg('score')
    .then(function(results){
      returnData.ranking = results;
      res.json(returnData);
    })
  })
  .catch(function(err){
    res.json(err);
  })
})

router.post('/addpost', function(req, res){
  return knex('posts')
  .insert({
    post: req.body.post,
    name:req.body.name
  })
  .then(function(results){
    res.json(results)
    return results;
  })
  .catch(function(err){
    console.log('Oh NO');
    res.json(err);
  })
})

router.post('/addrank', function(req, res){
  return knex('ranking')
  .insert({
    score: req.body.score,
  })
  .then(function(results){
    res.json(results)
    return results;
  })
  .catch(function(err){
    console.log('Oh NO');
    res.json(err);
  })
})

module.exports = router;

// eturn knex('child_goal')
//           .join('reward', 'child_goal.reward_id', '=', 'reward.id')
