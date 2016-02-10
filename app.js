
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  driversApi = require('./routes/api'),
  formsApi = require('./routes/formsApi'),
  session = require('express-session'),
  fbInstanceForJob = require("firebase")
  bodyParser = require('body-parser'),
  multer = require('multer');

var twilio = require('twilio'),
client = twilio('AC544fe7786d619ac8e6c4cc76bdaa6aa9', '10806eada03a367712e6c8ea5739cc2b'),
cronJob = require('cron').CronJob;

var textJob = new cronJob( '00 10 * * *', function(){
  var fb = new fbInstanceForJob("https://sabak.firebaseio.com/");
  fb.authWithPassword({
        email    : "info@sabak.in",password : "password"
      }, function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
      } else {
          console.log("Login success!", error);
          fb.child("vechiles").orderByChild("taxExpiry").endAt((new Date()).getTime()).once("value", function(data) {
              var count=0;
              if(data.val()){
                for(var item in data.val()){count++;}
              }
              fb.unauth();
              console.log("Record count!", count);
              client.sendMessage( { to:'+919702579472', from:'+12016852518', body: "Tax for " + count + ' vechiles are going to expire today' }, function( err, data ) {
                console.log(err);
                console.log( data.body );
              });
          });     
      }
  });
},  null, true);

var app = module.exports = express.createServer();
var sess;

//app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(session({secret: 'Tr@ckmy5ch001Bu5'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  //app.use(bodyParser.json());  
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
//});


var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

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
app.get('/api/drivers/getExpiredRecord/:field', driversApi.getExpiredRecord);
app.get('/api/drivers/getDueRecord/:field', driversApi.getExpiredRecord);
app.get('/api/drivers/getPendingRecord/:field', driversApi.getExpiredRecord);

app.get('/api/forms/getList', formsApi.getList);
app.post('/api/forms/save', formsApi.save);
app.put('/api/forms/:id', formsApi.update);
app.delete('/api/forms/:id', formsApi.delete);

app.post('/api/upload', function(req, res) {
        console.log("file uppload here");
        upload(req,res,function(err){
        console.log("file uppload ends");
            if(err){
                 console.log(err); 
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });

app.get('*', routes.index);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
