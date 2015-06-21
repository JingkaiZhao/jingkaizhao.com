var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JingkaiZhao\'s Personal Site' });
});

module.exports = router;
