var firebaseRef = require('./config').firebaseRef();
exports.getList = function (req, res) {
	firebaseRef.child("vechiles").once("value",function(data){
		res.json(data.val());		
	});	
};
exports.save = function (req, res) {
	firebaseRef.child("vechiles").push(req.body, function(data){
		firebaseRef.child("vechiles").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.update = function (req, res) {
	firebaseRef.child("vechiles").child(req.params.id)
	.update(req.body, function(data){
		firebaseRef.child("vechiles").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.delete = function (req, res) {
	var id = req.params.id;
	firebaseRef.child("vechiles").child(id).remove(function(){
		firebaseRef.child("vechiles").once("value",function(data){
			res.json(data.val());		
		});
	});
};