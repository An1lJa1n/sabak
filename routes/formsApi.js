var firebaseRef = require('./config').firebaseRef();
exports.getList = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").once("value",function(data){
		res.json(data.val());		
	});	
};
exports.save = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").push(req.body, function(data){
		firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.update = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").child(req.params.id)
	.update(req.body, function(data){
		firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.delete = function (req, res) {
	var id = req.params.id;
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").child(id).remove(function(){
		firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("drivers").once("value",function(data){
			res.json(data.val());		
		});
	});
};