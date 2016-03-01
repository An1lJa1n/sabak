'use strict';
angular.module('myApp.directives', [])
	.directive('appVersion', ['version', function(version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
  	}])
  .directive('fileChange',['$parse', function($parse){
    return{
      require:'ngModel',
      restrict:'A',
      link:function($scope,element,attrs,ngModel){
        var attrHandler=$parse(attrs['fileChange']);
        var handler=function(e){
          $scope.$apply(function(){
            attrHandler($scope,{$event:e,files:e.target.files});
          });
        };
        element[0].addEventListener('change',handler,false);
      }
    }
  }])
  .directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog" style="width:900px">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.isFormInvalid = true;
        scope.$watch(attrs.visible, function(value){
          if(value == true){
            $(element).modal('show');
            $(".modal-dialog").parent().find(".modal-backdrop").css("z-index",0);
          }
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
