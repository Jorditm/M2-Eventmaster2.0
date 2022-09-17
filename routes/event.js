const express = require ('express');
const router = express.Router();
const axios = require ('axios');
require ('dotenv').config();
router.use((req,res,next)=>{
  if(!req.session.currentUser){
    res.redirect('/auth/login')
  }
  else{next()}
})

  router.get('/search-event', (req, res, next) => {
    const searchEvent = req.query.search
    axios.get(`https://app.ticketmaster.com/discovery/v2/events?&size=30&keyword=${searchEvent}&apikey=${process.env.CONSUMER_KEY}`)
    .then(response=>{
       console.log(response)
     const eventArray=response.data['_embedded'].events
     console.log(eventArray)
     res.render("event-search-result", {events: eventArray});
    })
    .catch(error=>console.log(error)) 
  });

  router.get('/event', (req, res, next) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events?&size=12&sort=random&apikey=${process.env.CONSUMER_KEY}`)
    .then(response=>{
       console.log(response)
     const eventArray=response.data['_embedded'].events
     console.log(eventArray)
     res.render("event", {events: eventArray});
    })
    .catch(error=>console.log(error)) 
  });

  router.get('/search-attractions', (req, res, next) => {
    const searchEvent = req.query.search
    axios.get(`https://app.ticketmaster.com/discovery/v2/attractions?&size=30&keyword=${searchEvent}&apikey=${process.env.CONSUMER_KEY}`)
    .then(response=>{
       console.log(response)
     const attractionArray=response.data['_embedded'].attractions
     console.log(attractionArray)
     res.render("attractions-search-result", {events: attractionArray});
    })
    .catch(error=>console.log(error))
    
  });

  router.get('/attractions', (req, res, next) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/attractions?&size=12&sort=random&apikey=${process.env.CONSUMER_KEY}`)
    .then(response=>{
       console.log(response)
     const attractionArray=response.data['_embedded'].attractions
     console.log(attractionArray)
     res.render("attractions", {events: attractionArray});
    })
    .catch(error=>console.log(error))
    
  });


module.exports= router;