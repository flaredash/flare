require('newrelic');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var flash = require('connect-flash');

var app = express();

// Use jade for templating.
app.set('view engine', 'jade');

// Initialize middleware.
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(stormpath.init(app, {
  apiKeyId:     process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  secretKey:    process.env.STORMPATH_SECRET_KEY,
  application:  process.env.STORMPATH_URL,
  redirectUrl:  '/dashboard',

  // Make customData available on every request, automatically.
  expandCustomData: true,
}));

// Activate our routes.
app.use('/', require('./routes/index'));

////////////////////////////////////////
// Save a token from Spark to Stormpath
////////////////////////////////////////

app.post('/savetoken', stormpath.loginRequired, function(req, res) { 
  req.user.customData.token = req.body.token;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark token: ' + req.user.customData.token + ' saved to SP custom data.');
    } else {
      res.send('Error saving token.');
    }
  });
});

////////////////////////////////////////
// Save a few details about device0
////////////////////////////////////////

// Save devices.
app.post('/savedevices', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device0id = req.body.device0id;
  // req.user.customData.device0name = req.body.device0name;
  // req.user.customData.device0con = req.body.device0con;
  // req.user.customData.device1id = req.body.device1id;
  // req.user.customData.device1name = req.body.device1name;
  // req.user.customData.device1con = req.body.device1con;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark device0 id: ' + req.user.customData.device0id + ' saved to SP custom data.');
      res.send('Spark device0 name: ' + req.user.customData.device0name + ' saved to SP custom data.');
      res.send('Spark device0 connection status: ' + req.user.customData.device0con + ' saved to SP custom data.');
    } else {
      res.send('Error saving device0.');
    }
  });
});

// Check devices.
app.post('/checkdevices', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device0var = req.body.device0var;
  // req.user.customData.device0fun = req.body.device0fun;
  // req.user.customData.device1var = req.body.device1var;
  // req.user.customData.device1fun = req.body.device1fun;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark device0 variables: ' + req.user.customData.device0var + ' saved to SP custom data.');
      res.send('Spark device0 functions: ' + req.user.customData.device0fun + ' saved to SP custom data.');
    } else {
      res.send('Error saving device0.');
    }
  });
});

// // Save device1.
// app.post('/savedevice1', stormpath.loginRequired, function(req, res) { 
//   req.user.customData.device1id = req.body.device1id;
//   req.user.customData.device1name = req.body.device1name;
//   req.user.customData.device1con = req.body.device1con;
//   req.user.customData.save(function(err) {
//     if (!err) {
//       res.send('Spark device1 id: ' + req.user.customData.device1id + ' saved to SP custom data.');
//       res.send('Spark device1 name: ' + req.user.customData.device1name + ' saved to SP custom data.');
//       res.send('Spark device1 connection status: ' + req.user.customData.device1con + ' saved to SP custom data.');
//     } else {
//       res.send('Error saving device0.');
//     }
//   });
// });


// // Save device0 ID.
// app.post('/savedevice0id', stormpath.loginRequired, function(req, res) { 
//   req.user.customData.device0id = req.body.device0id;
//   req.user.customData.save(function(err) {
//     if (!err) {
//       res.send('Spark device0 id: ' + req.user.customData.device0id + ' saved to SP custom data.');
//     } else {
//       res.send('Error saving id.');
//     }
//   });
// });

// // Save device0 name.
// app.post('/savedevice0name', stormpath.loginRequired, function(req, res) { 
//   req.user.customData.device0name = req.body.device0name;
//   req.user.customData.save(function(err) {
//     if (!err) {
//       res.send('Spark device0 name: ' + req.user.customData.device0name + ' saved to SP custom data.');
//     } else {
//       res.send('Error saving name.');
//     }
//   });
// });

// // Save device0 connection status.
// app.post('/savedevice0con', stormpath.loginRequired, function(req, res) { 
//   req.user.customData.device0con = req.body.device0con;
//   req.user.customData.save(function(err) {
//     if (!err) {
//       res.send('Spark device0 connected: ' + req.user.customData.device0con + ' saved to SP custom data.');
//     } else {
//       res.send('Error saving connection.');
//     }
//   });
// });

// // Save device0 variables.
// app.post('/savedevice0var', stormpath.loginRequired, function(req, res) { 
//   req.user.customData.device0var = req.body.device0var;
//   req.user.customData.save(function(err) {
//     if (!err) {
//       res.send('Spark device0 variables: ' + req.user.customData.device0var + ' saved to SP custom data.');
//     } else {
//       res.send('Error saving variables.');
//     }
//   });
// });

// // Save device0 functions.
// app.post('/savedevice0fun', stormpath.loginRequired, function(req, res) { 
//   req.user.customData.device0fun = req.body.device0fun;
//   req.user.customData.save(function(err) {
//     if (!err) {
//       res.send('Spark device0 functions: ' + req.user.customData.device0fun + ' saved to SP custom data.');
//     } else {
//       res.send('Error saving functions.');
//     }
//   });
// });

////////////////////////////////////////
// Save a few details about device1
////////////////////////////////////////

////////////////////////////////////////
// Display a user's data.
////////////////////////////////////////

app.get('/gettoken', stormpath.loginRequired, function(req, res) {
  res.json(req.user);
});

////////////////////////////////////////
//Error Handling...
////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 3000);