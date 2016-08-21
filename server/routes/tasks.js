var express = require('Express');
var router = express.Router();
var pg = require('pg');
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

router.post('/', function(req, res){
  var task = req.body;
  var d = new Date();
  var dateAdded = (d.getMonth() + 1) + '-' + (d.getDate()) + '-' + d.getFullYear();
  var completed = false;
  task.dateAdded = dateAdded;
  task.completed = completed;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      res.sendStatus(500);
      console.log('connect broke');
    }

    client.query('INSERT INTO tasks (task_name, task_created_date, task_due_date, task_info, completed)'
                  + 'VALUES ($1, $2, $3, $4, $5)',
                  [task.task_name, task.dateAdded, task.task_due_date, task.task_info, task.completed],
                  function(err, result){
                    done();
                    if(err){
                      res.sendStatus(500);
                    }else{
                      res.sendStatus(201);
                    }
    });
  });
});


























module.exports = router;
