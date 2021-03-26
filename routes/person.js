var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('person');
});

router.get('/:id',function(req,res,next){
    res.render('person',{"name":req.params.id})
})

module.exports = router;