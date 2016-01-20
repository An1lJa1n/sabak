var firebaseRef = require('./config').firebaseRef();
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
				req.session.userProile = authData;
				res.render('index');	
			}
		});	
	}else
		res.render('login');
}
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