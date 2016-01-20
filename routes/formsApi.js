var firebaseRef = require('./config').firebaseRef();
exports.getList = function (req, res) {
	firebaseRef.child("forms").once("value",function(data){
		res.json(data.val());		
	});	
};
exports.save = function (req, res) {
	firebaseRef.child("forms").push(req.body, function(data){
		firebaseRef.child("forms").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.update = function (req, res) {
	firebaseRef.child("forms").child(req.params.id)
	.update(req.body, function(data){
		firebaseRef.child("forms").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.delete = function (req, res) {
	var id = req.params.id;
	firebaseRef.child("forms").child(id).remove(function(){
		firebaseRef.child("forms").once("value",function(data){
			res.json(data.val());		
		});
	});
};