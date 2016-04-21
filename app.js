var express = require('express'),routes = require('./routes'),driversApi = require('./routes/api'),formsApi = require('./routes/formsApi'),
  session = require('express-session'),fbInstanceForJob = require("firebase"), bodyParser = require('body-parser'),multer = require('multer');

var path = require('path');
var mime = require('mime');
var fs= require('fs');

var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var request = require('request');
var twilio = require('twilio'), client = twilio('AC544fe7786d619ac8e6c4cc76bdaa6aa9', '10806eada03a367712e6c8ea5739cc2b'), cronJob = require('cron').CronJob;

var fb = new fbInstanceForJob("https://sabak.firebaseio.com/");
var smtpTransport = nodemailer.createTransport(smtpTransport({
   service: "Gmail",
   auth: {
       user: "rsabak@sabak.in",
       pass: "Reviv@123"
   }
}));
var sendEmail = function(){
  fb.authWithPassword({
        email    : "info@sabak.in",password : "password"
      }, function(error, authData) {
        if (error) console.log("Login Failed!", error);
        else {
          fb.child("EmilJobStatus").set({lastSent: (new Date()).toString()});
          fb.child("users").once("value",function(users){
              var usersList = users.val();
              var usersArr= [];
              for(var user in usersList){
                if(usersList[user].isEmail){
                  (function(email,userId) {
                    fb.child("clients").child(usersList[user].ClientCode).child("vechiles").once("value", function(vechilesSS) {
                        var vechiles = vechilesSS.val();
                        var msg = getMessageBody(vechiles)
                        smtpTransport.sendMail({from: "rsabak@sabak.in", to: email, subject: "Daily Expiry Report", text: msg}, function(error, response){
                          fb.child("users").child(userId).child("lastEmailStatus").set({message: msg, sentAt: (new Date()).toString()});
                        });
                        console.log("email Sent to " + email);  
                    });
                  })(usersList[user].email,user);
                }                 
              }
          });
      }
  });  
};


var emailJob = new cronJob( '00 30 3 * * *', function(){
    sendEmail();
},null, true); 

var textJob = new cronJob( '00 30 3 * * *', function(){
    sendSMS();
},null, true);

var getMessageBody = function(vechiles){
    var minDate = Date.now() - 15*24*60*60*1000;
    var maxDate = Date.now() - 1*24*60*60*1000;
    var tax=0, counterPermit=0,fitness=0,greenTax=0,insurance=0,national=0,permit=0,professionalTax=0;
    var hasExpired = function(value){
      if(!value) return false;
      return (new Date(value)).getTime()> minDate && (new Date(value)).getTime() < maxDate;
    };
    for(key in vechiles){
        if(hasExpired(vechiles[key].taxExpiry)) tax++;
        if(hasExpired(vechiles[key].counterPermitExpiry)) counterPermit++;
        if(hasExpired(vechiles[key].fitnessExpiry)) fitness++;
        if(hasExpired(vechiles[key].greenTaxExpiry)) greenTax++;
        if(hasExpired(vechiles[key].insuranceExpiry)) insurance++;
        if(hasExpired(vechiles[key].nationalPermitExpiry)) national++;
        if(hasExpired(vechiles[key].permitExpiry)) permit++;
        if(hasExpired(vechiles[key].professionalTaxExpiry)) professionalTax++;
    }
    var message = "Expiry summary as of today is: Tax(" + tax +"), Counter Permit(" + counterPermit +"), Fitness(" + fitness + "), ";
    message = message + "Green Tax(" + greenTax +"), Insurance(" + insurance +"), National Permit(" + national + "), ";
    message = message + "Permit(" + permit +"), Professional Tax(" + professionalTax +")";
    return message;
}; 

var sendSMS = function(){
  fb.authWithPassword({
        email    : "info@sabak.in",password : "password"
      }, function(error, authData) {
        if (error) console.log("Login Failed!", error);
        else {
          fb.child("SMSJobStatus").set({date: (new Date()).toString()});
          fb.child("users").once("value",function(users){
              var usersList = users.val();
              for(var user in usersList){
                 if(usersList[user].isSMS){
                  (function(mobile,userId) {
                    fb.child("clients").child(usersList[user].ClientCode).child("vechiles").once("value", function(vechilesSS) {
                        var vechiles = vechilesSS.val();
                        var msg = getMessageBody(vechiles);
                        var url = "http://api.textlocal.in/send/?apiKey=BwGY3tTziYw-TdNbBKpZ69UqghGllbOkBQnsdfPEZT&numbers=" + mobile + "&message=" + msg + "&sender=RSABAK"; 
                        request(url, function (error, response, body) {});
                        fb.child("users").child(userId).child("lastSMSStatus").set({message: msg, sentAt: (new Date()).toString(), url: url});
                    });
                  })(usersList[user].mobile, user);
                 }                 
              }
          });
      }
  });
};

var app = module.exports = express();//.createServer();
var sess;

//app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(session({secret: 'Tr@ckmy5ch001Bu5'}));
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser());  
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.url.indexOf(".jpg") > 0)
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
  //app.use(app.router);
//});

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
});

var upload = multer({storage: storage}).single('file');

//app.use(express.errorHandler());

// Routes

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/userInfo',routes.userInfo);
app.get('/partials/:name', routes.partials);
app.get('/api/totalVechiles', driversApi.totalVechiles);
app.get('/api/drivers/getList', driversApi.getList);
app.post('/api/drivers/save', driversApi.save);
app.put('/api/drivers/:id', driversApi.update);
app.delete('/api/drivers/:id', driversApi.delete);
app.get('/api/drivers/getExpiredRecord/:field', driversApi.getExpiredRecord);
app.get('/api/drivers/getDueRecord/:field', driversApi.getDueRecord);
app.get('/api/drivers/getOverdueRecord/:field', driversApi.getOverdueRecord);

app.get('/api/forms/getList', formsApi.getList);
app.post('/api/forms/save', formsApi.save);
app.put('/api/forms/:id', formsApi.update);
app.delete('/api/forms/:id', formsApi.delete);
app.post('/api/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
});
app.post('/api/download', function(req, res){
  console.log(req.body.filename);
  var filePath = path.join(__dirname, 'uploads', req.body.filename);
  console.log(filePath);
  var filename = path.basename(filePath);
  var mimetype = mime.lookup(filePath);
  console.log(mimetype);
  
  var stat = fs.statSync(filePath);
  var fileToSend = fs.readFileSync(filePath);
  res.setHeader('Content-Type', mimetype);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', filename);
  res.send(fileToSend);
});
app.get('*', routes.index);
app.listen(process.env.PORT || 3000, function(){
  //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});