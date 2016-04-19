var firebaseRef = require('./config').firebaseRef();
var path = require('path');
exports.login = function(req, res){
	if(req.body.password && req.body.email){
		firebaseRef.authWithPassword({
				email    : req.body.email,
				password : req.body.password
			}, function(error, authData) {
				if (error) {
				res.render('login',{error: "Login Failed"});
				console.log("Login Failed!", error);
			} else {
				console.log("authenticated");
				console.log(authData.uid);
				firebaseRef.child("users").child(authData.uid).once("value", function(data) {
  					req.session.userProile = data.val();
  					res.render('index');
				});
			}
		});	
	}else
		res.render('login');
};
exports.userInfo = function(req, res){
	res.json({name:req.session.userProile.Name, clientName: req.session.userProile.clientName});
};
exports.index = function(req, res){
	res.render('index');
};
exports.logout = function(req, res){
	console.log("logout called");
	firebaseRef.unauth();
	req.session.userProile= undefined;
	res.render('login');
};
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};