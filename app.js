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
      res.status(500).json({ error: 'Failed to save token. Try again.' });
    }
  });
});

////////////////////////////////////////
// Save number of devices
////////////////////////////////////////

app.post('/savelength', stormpath.loginRequired, function(req, res) { 
  req.user.customData.length = req.body.length;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Saved length of ' + req.user.customData.length + ' to SP custom data.');
    } else {
      res.status(500).json({ error: 'Failed to save length. Try again.' });
    }
  });
});

////////////////////////////////////////
// Save basic details about devices
////////////////////////////////////////

// Save device0 id, name and connection status
app.post('/savedevice0', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device0id = req.body.deviceid;
  req.user.customData.device0name = req.body.devicename;
  req.user.customData.device0con = req.body.devicecon;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark device0 name: ' + req.user.customData.device0name + ' id, name and connection status saved to SP custom data.');
    } else {
      res.status(500).json({ error: 'Failed to save device0 general data. Try again.' });
    }
  });
});

// Save device1 id, name and connection status
app.post('/savedevice1', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device1id = req.body.deviceid;
  req.user.customData.device1name = req.body.devicename;
  req.user.customData.device1con = req.body.devicecon;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark device1 name: ' + req.user.customData.device1name + ' id, name and connection status saved to SP custom data.');
    } else {
      res.status(500).json({ error: 'Failed to save device1 general data. Try again.' });
    }
  });
});

// Save device2 id, name and connection status
app.post('/savedevice2', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device2id = req.body.deviceid;
  req.user.customData.device2name = req.body.devicename;
  req.user.customData.device2con = req.body.devicecon;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark device2 id: ' + req.user.customData.device2id + ' id, name and connection status saved to SP custom data.');
    } else {
      res.status(500).json({ error: 'Failed to save device2 general data. Try again.' });
    }
  });
});

// Save device3 id, name and connection status
app.post('/savedevice3', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device3id = req.body.deviceid;
  req.user.customData.device3name = req.body.devicename;
  req.user.customData.device3con = req.body.devicecon;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Spark device3 id: ' + req.user.customData.device3id + ' id, name and connection status saved to SP custom data.');
    } else {
      res.status(500).json({ error: 'Failed to save device3 general data. Try again.' });
    }
  });
});

////////////////////////////////////////
// Save version from devices
////////////////////////////////////////

// Save device0 version
app.post('/saveversion0', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device0ver = req.body.devicever;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Saved version');
    } else {
      res.status(500).json({ error: 'Failed to save device0 version. Try again.' });
    }
  });
});

// Save device1 version
app.post('/saveversion1', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device1ver = req.body.devicever;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Saved version');
    } else {
      res.status(500).json({ error: 'Failed to save device0 version. Try again.' });
    }
  });
});

// Save device2 version
app.post('/saveversion2', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device2ver = req.body.devicever;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Saved version');
    } else {
      res.status(500).json({ error: 'Failed to save device0 version. Try again.' });
    }
  });
});

// Save device3 version
app.post('/saveversion3', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device3ver = req.body.devicever;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Saved version');
    } else {
      res.status(500).json({ error: 'Failed to save device0 version. Try again.' });
    }
  });
});

////////////////////////////////////////////
// Save variables from devices
////////////////////////////////////////////

// Save device0 variables
app.post('/savevar0', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device0var0 = req.body.devicevar0;
  req.user.customData.device0var1 = req.body.devicevar1;
  req.user.customData.device0var2 = req.body.devicevar2;
  req.user.customData.device0var3 = req.body.devicevar3;
  req.user.customData.device0var4 = req.body.devicevar4;
  req.user.customData.device0var5 = req.body.devicevar5;
  req.user.customData.device0var6 = req.body.devicevar6;
  req.user.customData.device0var7 = req.body.devicevar7;
  req.user.customData.device0var8 = req.body.devicevar8;
  req.user.customData.device0var9 = req.body.devicevar9;
  req.user.customData.device0var9 = req.body.devicevar10;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device0 checked for variables');
    } else {
      res.status(500).json({ error: 'Failed to save device0 variables. Try again.' });
    }
  });
});

// Save device1 variables
app.post('/savevar1', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device1var0 = req.body.devicevar0;
  req.user.customData.device1var1 = req.body.devicevar1;
  req.user.customData.device1var2 = req.body.devicevar2;
  req.user.customData.device1var3 = req.body.devicevar3;
  req.user.customData.device1var4 = req.body.devicevar4;
  req.user.customData.device1var5 = req.body.devicevar5;
  req.user.customData.device1var6 = req.body.devicevar6;
  req.user.customData.device1var7 = req.body.devicevar7;
  req.user.customData.device1var8 = req.body.devicevar8;
  req.user.customData.device1var9 = req.body.devicevar9;
  req.user.customData.device0var9 = req.body.devicevar10;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device1 checked for variables');
    } else {
      res.status(500).json({ error: 'Failed to save device1 variables. Try again.' });
    }
  });
});

// Save device2 variables
app.post('/savevar2', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device2var0 = req.body.devicevar0;
  req.user.customData.device2var1 = req.body.devicevar1;
  req.user.customData.device2var2 = req.body.devicevar2;
  req.user.customData.device2var3 = req.body.devicevar3;
  req.user.customData.device2var4 = req.body.devicevar4;
  req.user.customData.device2var5 = req.body.devicevar5;
  req.user.customData.device2var6 = req.body.devicevar6;
  req.user.customData.device2var7 = req.body.devicevar7;
  req.user.customData.device2var8 = req.body.devicevar8;
  req.user.customData.device2var9 = req.body.devicevar9;
  req.user.customData.device0var9 = req.body.devicevar10;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device2 checked for variables');
    } else {
      res.status(500).json({ error: 'Failed to save device2 variables. Try again.' });
    }
  });
});

// Save device3 variables
app.post('/savevar3', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device3var0 = req.body.devicevar0;
  req.user.customData.device3var1 = req.body.devicevar1;
  req.user.customData.device3var2 = req.body.devicevar2;
  req.user.customData.device3var3 = req.body.devicevar3;
  req.user.customData.device3var4 = req.body.devicevar4;
  req.user.customData.device3var5 = req.body.devicevar5;
  req.user.customData.device3var6 = req.body.devicevar6;
  req.user.customData.device3var7 = req.body.devicevar7;
  req.user.customData.device3var8 = req.body.devicevar8;
  req.user.customData.device3var9 = req.body.devicevar9;
  req.user.customData.device0var9 = req.body.devicevar10;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device3 checked for variables');
    } else {
      res.status(500).json({ error: 'Failed to save device3 variables. Try again.' });
    }
  });
});

////////////////////////////////////////////
// Save functions from devices
////////////////////////////////////////////

// Save device0 functions
app.post('/savefun0', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device0fun0 = req.body.devicefun0;
  req.user.customData.device0fun1 = req.body.devicefun1;
  req.user.customData.device0fun2 = req.body.devicefun2;
  req.user.customData.device0fun3 = req.body.devicefun3;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device0 checked for functions');
    } else {
      res.status(500).json({ error: 'Failed to save device0 functions. Try again.' });
    }
  });
});

// Save device1 functions
app.post('/savefun1', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device1fun0 = req.body.devicefun0;
  req.user.customData.device1fun1 = req.body.devicefun1;
  req.user.customData.device1fun2 = req.body.devicefun2;
  req.user.customData.device1fun3 = req.body.devicefun3;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device1 checked for functions');
      console.log(req.bodydevicefun0);
    } else {
      res.status(500).json({ error: 'Failed to save device1 functions. Try again.' });
    }
  });
});

// Save device2 functions
app.post('/savefun2', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device2fun0 = req.body.devicefun0;
  req.user.customData.device2fun1 = req.body.devicefun1;
  req.user.customData.device2fun2 = req.body.devicefun2;
  req.user.customData.device2fun3 = req.body.devicefun3;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device2 checked for functions');
    } else {
      res.status(500).json({ error: 'Failed to save device2 functions. Try again.' });
    }
  });
});

// Save device3 functions
app.post('/savefun3', stormpath.loginRequired, function(req, res) { 
  req.user.customData.device3fun0 = req.body.devicefun0;
  req.user.customData.device3fun1 = req.body.devicefun1;
  req.user.customData.device3fun2 = req.body.devicefun2;
  req.user.customData.device3fun3 = req.body.devicefun3;
  req.user.customData.save(function(err) {
    if (!err) {
      res.send('Device3 checked for functions');
    } else {
      res.status(500).json({ error: 'Failed to save device3 functions. Try again.' });
    }
  });
});

////////////////////////////////////////
// Display a user's customdata
////////////////////////////////////////

app.get('/userdetails', stormpath.loginRequired, function(req, res) {
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
