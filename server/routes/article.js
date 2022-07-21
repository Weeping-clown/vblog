var express = require('express');
var router = express.Router();
var fs = require('fs');

var connection = require('../db/sql.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('select id,title,tags,description from article', function(error,results){
    res.send({
      code:0,
      data:results  
    })
  })
});

router.post('/', function(req, res, next) {
  connection.query('SELECT id,article_id,praise_count FROM article_count ORDER BY praise_count DESC', function(error,results){
    let ids = []
    results.map(item => {
      ids.push(item['article_id'])
    })
    console.log(ids)
    connection.query(`SELECT id,title FROM article WHERE id in (${ids.join(',')})`, function(error, result) {
      console.log(result)
      res.send({
        code:1,
        data:result  
      })
    })
  })
});

router.post('/tags', function(req, res, next) {
  console.log(req.query)
  connection.query('SELECT tags FROM article', function(error,results){
    console.log(results)
    let tags = []
    results.map(item => {
      tags.push(item['tags'])
    })
    res.send({
      code:0,
      data:tags  
    })
  })
});

router.get('/details', function(req, res, next) {
  let id = req.query.id
  connection.query(`select path from article where id=${id}`, function(error,results){
    fs.readFile(`public/md/${results[0].path}.md`, function(err, data){
      if(err){
          console.log(err);
          res.send("文件不存在！");
      }else{
        res.end(data) ;
      } 
    });
  })
});

module.exports = router;
