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

module.exports = router;

eturn knex('child_goal')
          .join('reward', 'child_goal.reward_id', '=', 'reward.id')
