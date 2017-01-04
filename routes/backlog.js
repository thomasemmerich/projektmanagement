var express = require('express');
var router = express.Router();
var task = require('../models/task');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backlogIndex', { title: 'Projektmanagement Backlog'});
});

router.post('/rest', function(req, res, next) {
  task.new(req.body.task, req.body.description, req.body.priority ,res);
  //res.render('backlogNewTask', { title: 'Task anlegen', action : 'success'});
  console.log("Task: " + req.body.task);
  console.log("Description: " + req.body.description);
});

router.post('/rest/update', function(req, res, next) {
  console.log("Update von : " + req.body.id);

  task.updateStatus(req.body.id, req.body.status, res);
});

router.get('/new', function(req, res, next) {
  res.render('backlogNewTask', { title: 'Task anlegen', action : 'none'});
});

router.get('/rest/', function(req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      task.getAll(res);
});

router.get('/rest/:id', function(req, res, next) {
      var id = req.params.id;
      task.get(id, res);

});

module.exports = router;
