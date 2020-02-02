var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here



router.get('/addevent', function(req, res){
  var newInsect = {
    'place': req.session.data['place'],
    'body': req.session.data['body'],
    'insect': req.session.data['insect']
  }

  req.session.data['place'] = null
  req.session.data['body'] = null
  req.session.data['insect'] = null
  req.session.data['more'] = null

  if(!req.session.data['bites-and-stings']){
    req.session.data['bites-and-stings'] = []
  }
  req.session.data['bites-and-stings'].push(newInsect)

  res.redirect('list')
})

// in UK
router.post('/yn', function(req, res){
  req.session.data['errors'] = [];
  if(req.session.data['location'] != null){
    if(req.session.data['location'] == "yes"){
        res.redirect('event/town')
        return
    } else {
        res.redirect('cannot-use')
    }
  } else {

    req.session.data['errors'].push('yes-no')
    res.redirect('yes-no')
  }
})

// location
router.post('/event/town', function(req, res){
  req.session.data['errors'] = [];
  if(req.session.data['place'] > "" ){
        res.redirect('checkbox')
  } else {

    req.session.data['errors'].push('place')
    res.redirect('town')
  }
})

// body
router.post('/body', function(req, res){
  req.session.data['errors'] = [];
  if(req.session.data['body'] > ""){
    res.redirect('event/insect')
  } else {

    req.session.data['errors'].push('body')
    res.redirect('event/checkbox')
  }
})

// insect
router.post('/insecttype', function(req, res){
  req.session.data['errors'] = [];
  if(!req.session.data['insect'] == ""){
      res.redirect('event/check-your-answers')
      return
  } else {

    req.session.data['errors'].push('insect')
    res.redirect('event/insect')
  }
})

// add another
router.post('/insect-more', function(req, res){
  req.session.data['errors'] = [];
  if(req.session.data['more'] != null){
    if(req.session.data['more'] == "yes"){
        res.redirect('event/town')
        return
    } else {
        res.redirect('about-you/post-address')
    }
  } else {

    req.session.data['errors'].push('more')
    res.redirect('list')
  }
})

// address
router.post('/address', function(req, res){
  req.session.data['errors'] = [];

  if(req.session.data['address-one'] > ""  && req.session.data['town'] > "" && req.session.data['postcode'] > ""){
        res.redirect('about-you/dob')
  } else {

    if(!req.session.data['address-one'] > ""){
      req.session.data['errors'].push('address1')
    }
    // if(!req.session.data['address-two'] > ""){
    //   req.session.data['errors'].push('address2')
    // }
    if(!req.session.data['town'] > ""){
      req.session.data['errors'].push('town')
    }
    if(!req.session.data['postcode'] > ""){
      req.session.data['errors'].push('postcode')
    }
    res.redirect('about-you/post-address')
  }
})

//dob
router.post('/dob', function(req, res){
  req.session.data['errors'] = [];

  if(req.session.data['dob-day'] > "" && req.session.data['dob-month'] > "" && req.session.data['dob-year'] > ""){
        res.redirect('check-your-answers')
  } else {
    req.session.data['errors'].push('dob')
    res.redirect('about-you/dob')
  }
})

module.exports = router
