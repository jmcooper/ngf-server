var auth = require('./auth'),
  events = require('./controllers/eventController'),
  users = require('./controllers/userController');
  path = require('path');

var fs = require('fs');


module.exports = function(app) {

  app.post('/api/login', auth.authenticate);
  app.get('/api/currentIdentity', auth.getCurrentIdentity);
  app.put('/api/users/:id', users.updateUser);
  
  app.get('/api/events', events.getEvents);
  app.get('/api/events/:eventId', events.getEvent);
  app.post('/api/events', events.saveEvent);
  app.get('/api/sessions/search', events.searchSessions);
  app.delete('/api/events/:eventId/sessions/:sessionId/voters/:voterId', events.deleteVoter);
  app.post('/api/events/:eventId/sessions/:sessionId/voters/:voterId', events.addVoter);
  
  app.post('/api/logout', function(req, res) {
    req.logout();
    res.end();
  });
  
  app.get('/app/*', function(req, res) {
    res.sendStatus(404);
  });
  
  app.get('/node_modules/*', function(req, res) {
    res.sendStatus(404);
  });

  app.get('/events/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
  });
  app.get('/user/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
  });
  app.get('/404', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
  });
  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
  });
  
  app.get('*', function(req, res) {
    console.log('404 error', req.path);
    res.sendStatus(404);
  });
}