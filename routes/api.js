var firebaseRef = require('./config').firebaseRef();
var addDays = function(days){
	return (new Date()).getTime() + days*24*60*60*1000;
};


exports.getExpiredRecord = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").orderByChild(req.params.field).startAt(addDays(-15)).endAt(addDays(-1)).once("value", function(data) {
  		res.json(data.val());
	});
};

exports.getDueRecord = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").orderByChild(req.params.field).startAt((new Date()).getTime()).endAt(addDays(30)).once("value", function(data) {
  		res.json(data.val());
	});
};
exports.getOverdueRecord = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").orderByChild(req.params.field).startAt(addDays(-60)).endAt(addDays(-16)).once("value", function(data) {
  		res.json(data.val());
	});
};

exports.totalVechiles = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").once("value",function(data){
		var count=0;
		var recrods = data.val();
		for(var i in recrods) count++;
      	res.json(count);		
	});	
};
exports.getList = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").once("value",function(data){
		res.json(data.val());		
	});	
};
exports.save = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").orderByChild("vehicalNumber").equalTo(req.body.vehicalNumber).once('value', function(snapshot) {
		console.log(snapshot.val());
		if(!snapshot.val())
			firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").push(req.body, function(data){
				firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").once("value",function(data){
					res.json(data.val());		
				});
			});
		else
			res.json({error: "Duplicate Vehical Number"});
	});	
};
exports.update = function (req, res) {
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").child(req.params.id)
	.update(req.body, function(data){
		firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.delete = function (req, res) {
	var id = req.params.id;
	console.log(req.params);
	console.log("item to be deleted:" + id);
	firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").child(id).remove(function(){
		firebaseRef.child("clients").child(req.session.userProile.ClientCode).child("vechiles").once("value",function(data){
			res.json(data.val());		
		});
	});
};