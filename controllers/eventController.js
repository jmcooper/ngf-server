var events = require('../database/events'),
  getNextId = require('./getNextId'),
  url = require('url');

var nextId = getNextId(events);

exports.getEvents = function(req, res) {
  res.send(events);
}

exports.getEvent = function(req, res) {
  var event = events.find(event => event.id === +req.params.eventId);
  res.send(event);
}

exports.searchSessions = function(req, res) {
	var term = req.query.search.toLowerCase();
  var results = [];
  events.forEach(event => {
    var matchingSessions = event.sessions.filter(session => session.name.toLowerCase().indexOf(term) > -1)
    matchingSessions = matchingSessions.map(session => {
      session.eventId = event.id;
      return session;
    })
    results = results.concat(matchingSessions);
  })
  res.send(results);
}

exports.deleteVoter = function(req, res) {
  var voterId = req.params.voterId,
      sessionId = parseInt(req.params.sessionId),
      eventId = parseInt(req.params.eventId);

  var session = events.find(event => event.id === eventId)
    .sessions.find(session => session.id === sessionId)
    
  session.voters = session.voters.filter(voter => voter !== voterId);
  res.send(session);
}

exports.addVoter = function(req, res) {
  var voterId = req.params.voterId,
      sessionId = parseInt(req.params.sessionId),
      eventId = parseInt(req.params.eventId);

  var event = events.find(event => event.id === eventId)
  var session = event.sessions.find(session => session.id === sessionId)
    
  session.voters.push(voterId);
  res.send(session);
}

exports.saveEvent = function(req, res) {
  var event = req.body;
  
  if (event.id) {
    var index = events.findIndex(e => e.id === event.id)
    events[index] = event
  } else {
    event.id = nextId;
    nextId++;
    event.sessions = [];
    events.push(event);
  }
  res.send(event);
  res.end(); 
}


