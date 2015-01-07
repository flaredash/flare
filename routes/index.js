var express = require('express');
var stormpath = require('express-stormpath');
var router = express.Router();

// Render the home page.
router.get('/', stormpath.loginRequired, function(req, res) {
  res.render('index', { title: 'Home' });
});

// Render the ronron page.
router.get('/events', stormpath.loginRequired, function(req, res) {
  res.render('events', { title: 'Events' });
});

// Render the dashboard page.
router.get('/dashboard', stormpath.loginRequired, function(req, res) {
  res.render('dashboard', { title: 'Dashboard' });
});

// Render the settings page.
router.get('/settings', stormpath.loginRequired, function(req, res) {
  res.render('settings', { title: 'Settings' });
});

module.exports = router;
