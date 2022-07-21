var express = require('express');
var router = express.Router();
var fs = require('fs');

var connection = require('../db/sql.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('select id,title,tags,description from article', function(error,results){
    console.log(results)
    res.send({
      code:0,
      data:results  
    })
  })
});

router.post('/name', function(req, res, next) {
  console.log(req.query)
  connection.query('select id,name from user', function(error,results){
    console.log(results)
    res.send({
      code:0,
      data:results  
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
