
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  driversApi = require('./routes/api'),
  formsApi = require('./routes/formsApi'),
  session = require('express-session');
var app = module.exports = express.createServer();
var sess;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(session({secret: 'Tr@ckmy5ch001Bu5'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(function(req, res, next) {
    if(req.url.indexOf(".jpg")==0)
      next()
    if(req.url.indexOf("/login")==0)
      next()
    else{
      if(req.session.userProile){
        next();
      }
      else{
        res.redirect('/login');
      }
    }
  });
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/partials/:name', routes.partials);

app.get('/api/drivers/getList', driversApi.getList);
app.post('/api/drivers/save', driversApi.save);
app.put('/api/drivers/:id', driversApi.update);
app.delete('/api/drivers/:id', driversApi.delete);

app.get('/api/forms/getList', formsApi.getList);
app.post('/api/forms/save', formsApi.save);
app.put('/api/forms/:id', formsApi.update);
app.delete('/api/forms/:id', formsApi.delete);


app.get('*', routes.index);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
