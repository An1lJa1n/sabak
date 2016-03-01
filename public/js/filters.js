'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('stStatusFilter', ['$filter', function($filter) {
    return function(input, predicate){
        return true;
    }
  }]).
  filter('csvToObj',function(){
  return function(input){
    var rows=input.split('\n');
    var retVal=[];
    var fieldsList = [];
    angular.forEach(rows,function(val, index){
      var o=val.split(',');
      if(index==0) fieldsList = o;
      else{
        var item = {};
        for(var i=0; i< o.length;i++) 
          item[fieldsList[i].trim()] =o[i]; 
        retVal.push(item);
      }
    });
    return retVal;
  };
});
