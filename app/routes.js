var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here


router.post('/yn', function(req, res){
  if(req.session.data['exemption'] == "yes"){
      res.redirect('/common-pages/name')
      return
  } else {
      res.redirect('/common-pages/cannot-use')
  }
})

module.exports = router
