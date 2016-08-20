var express = require('Express');
var router = express.Router();
var pg = require('pg'),
var connectionString = 'postgres://localhost:5432/Omicron';

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      res.sendStatus(500);
    }

    client.query('SELECT * FROM tasks', function(err, result){
      done();

      if(err){
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});




























moduel.exports = router;
