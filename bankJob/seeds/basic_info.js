
exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function(){
      return knex('comments').del()
    }).then(function(){
      return knex('ranking').del();
    }).then(function(){
      return knex.raw('ALTER SEQUENCE "comments_id_seq" RESTART WITH 1;');
    }).then(function(){
      return knex.raw('ALTER SEQUENCE "posts_id_seq" RESTART WITH 1;');
    }).then(function(){
      return knex.raw('ALTER SEQUENCE "ranking_id_seq" RESTART WITH 1;');
    }).then(function(){
      return Promise.all([
        knex('posts').insert({
          post:'Best Movie Ever!!!',
          name:'Danny'
        }),
        knex('posts').insert({
          post:'I Love Jason S.',
          name:'Kyle'
        }),
        knex('posts').insert({
          post:'Who even watched this movie?',
          name:'CJ'
        })
      ])
    }).then(function(){
      return Promise.all([
        knex('comments').insert({
          comment:"I agree",
          name:"David S",
          post_id:1
        }),
        knex('comments').insert({
          comment:"Me Too!",
          name:"David A",
          post_id:1
        }),
        knex('comments').insert({
          comment:"Nuh Uh",
          name:"Danny",
          post_id:3
        }),
      ])
    }).then(function(){
    return Promise.all([
      knex('ranking').insert({
        score:10
      }),
      knex('ranking').insert({
        score:10
      }),
      knex('ranking').insert({
        score:5
      }),
    ])
  })
};
