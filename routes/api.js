var firebaseRef = require('./config').firebaseRef();
var addDays = function(days){
	return (new Date()).getTime() + days*24*60*60*1000;
};


exports.getExpiredRecord = function (req, res) {
	firebaseRef.child("vechiles").orderByChild(req.params.field).endAt((new Date()).getTime()).once("value", function(data) {
  		if(data.val()){
  			var count=0;
  			for(var item in data.val()){count++;}
  			res.json(count);
  		}
  		else
  			res.json(0);
	});
};

exports.getDueRecord = function (req, res) {
	firebaseRef.child("vechiles").orderByChild(req.params.field).startAt(addDays(-10)).endAt(addDays(-2)).once("value", function(data) {
  		if(data.val()){
  			var count=0;
  			for(var item in data.val()){count++;}
  			res.json(count);
  		}
  		else
  			res.json(0);
	});
};
exports.getPendingRecord = function (req, res) {
	firebaseRef.child("vechiles").orderByChild(req.params.field).startAt(addDays(-2)).endAt(addDays(-1)).once("value", function(data) {
  		if(data.val()){
  			var count=0;
  			for(var item in data.val()){count++;}
  			res.json(count);
  		}
  		else
  			res.json(0);
	});
};

exports.getList = function (req, res) {
	firebaseRef.child("vechiles").once("value",function(data){
		res.json(data.val());		
	});	
};
exports.save = function (req, res) {
	firebaseRef.child("vechiles").orderByChild("vehicalNumber").equalTo(req.body.vehicalNumber).once('value', function(snapshot) {
		console.log(snapshot.val());
		if(!snapshot.val())
			firebaseRef.child("vechiles").push(req.body, function(data){
				firebaseRef.child("vechiles").once("value",function(data){
					res.json(data.val());		
				});
			});
		else
			res.json({error: "Duplicate Vehical Number"});
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
	console.log(req.params);
	console.log("item to be deleted:" + id);
	firebaseRef.child("vechiles").child(id).remove(function(){
		firebaseRef.child("vechiles").once("value",function(data){
			res.json(data.val());		
		});
	});
};