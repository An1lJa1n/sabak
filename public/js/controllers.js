
/*taxExpiry Tax Expiry
passingExpiry Passing Expiry
permitExpiry Permit Expiry
licenseExpiry_Transport License Expiry (Transport)
licenseExpiry_NonTransport License Expiry (Non-Transport) 
insuranceExpiry Insurance Expiry*/

angular.module("myApp.controllers", [])
.controller("IndexCtrl", function ($rootScope, $scope, $http) {
}).controller('menuCtrl', function($scope,$http,$window) {
        $scope.menu = {
        title: 'All Categories',
        id: 'menuId',
        icon: 'fa fa-bars',
        items: [
          {
            name: 'Home',
            link: '/addPost'
          },{
            name: 'Vehicals',
            link: '/vehicalServices'
          }, {
            name: 'Forms',
            link: '/formsService'
          }, {
            name: 'Change Password',
            link: 'changePassword'
          }          
          ]
      };
      $scope.logout = function(){
        $http.get('/logout').
          success(function(data, status, headers, config) {
            $window.location.href = '/login';
        });
      };

      $scope.events = [];
      $scope.options = {
        containersToPush: [$('#pushobj')],
        direction: 'ltr',
        onExpandMenuStart: function() {
          document.getElementById("pushobj").style.width="75%";
        },
        onCollapseMenuStart: function() {
          document.getElementById("pushobj").style.width="94%";
        }
      };
}).controller('servicesCtrl',function($scope,$http,$filter) {
  })
  .controller('appsCtrl', function($scope,$http) {
  })
  .controller('vehicalCtrl',function($scope,$http,$filter,Upload, $timeout) {
    $scope.driver = {};
    $scope.drivers = [];
    $scope.log = '';
    
    $scope.expiryPicker = {opened: false};
    $scope.fitnessExpiryPicker = {opened: false};
    $scope.permitExpiryPicker = {opened: false};
    $scope.nationalPermitExpiryPicker = {opened: false};
    $scope.insuranceExpiryPicker = {opened: false};
    $scope.professionalTaxExpiryPicker = {opened: false};

    $scope.openExpiryPicker = function() {$scope.expiryPicker.opened = true;};
    $scope.openFitnessExpiryPicker = function() {$scope.fitnessExpiryPicker.opened = true;};
    $scope.openPermitExpiryPicker = function() {$scope.permitExpiryPicker.opened = true;};
    $scope.openNationalPermitExpiryPicker = function() {$scope.nationalPermitExpiryPicker.opened = true;};
    $scope.openInsuranceExpiryPicker = function() {$scope.insuranceExpiryPicker.opened = true;};
    $scope.openProfessionalTaxExpiryPicker = function() {$scope.professionalTaxExpiryPicker.opened = true;};

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.formatDate = function(value){
        if(!value) return "";
        if(value.length>10)
          return value.substring(0,10);
        else
          return "";
    };
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + 
                      '% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                });
              }
            }
        }
    };
    $scope.filterStatuses = [{id:1,description: "Pending"},{id:2, description:"Overdue"},{id:3, description:"Expired"}];
    $scope.filters = [
        {id:1, text:'Tax'},
        {id:2, text:'Fitness'},
        {id:3, text:'Permit'},
        {id:4, text:'National Permit'},
        {id:5, text:'Insurance'},
        {id:6, text:'Prof. Tax'}
    ];
    $scope.showDetailModal=false;
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.driver = {};
        $scope.showModal = !$scope.showModal;
    };

    $scope.showDetails=function(row){
      $scope.driver = row;
      $scope.showDetailModal=true;
    };
    $scope.editItem = function(row){
      $scope.driver = row;
      $scope.showModal=true;
    };
    $scope.save  = function(){
      if($scope.driver.key){ //update
        var key = $scope.driver.key;
        delete $scope.driver.key;
        $http.put('/api/drivers/' + key, $scope.driver).
        success(function(data) {
            bindGrid(data);
            $scope.driver = {};
            $scope.showModal=false;
        });
      }  
      else{//Add new
        $http.post('/api/drivers/save', $scope.driver).success(function(data) {
            bindGrid(data);
            $scope.driver = {};
            $scope.showModal=false;
        });
      }
    };
    $scope.removeItem= function(row){
      $http.delete('/api/drivers/' + row.key).
        success(function(data) {
          bindGrid(data);
      });
    };
    var bindGrid =function(data){
      $scope.drivers=[];
      for(var key in data){
        var item = data[key];
        item.key =key;
        $scope.drivers.push(item); 
      }
    };
    $http.get('/api/drivers/getList').
      success(function(data, status, headers, config) {
         bindGrid(data);
    });
  }).controller('formsCtrl',function($scope,$http,$filter) {
    $scope.form = {};
    $scope.forms = [];
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.form = {};
        $scope.showModal = !$scope.showModal;
    };
    $scope.editItem = function(row){
      $scope.form = row;
      $scope.showModal=true;
    };
    $scope.save  = function(){
      if($scope.form.key){ //update
        var key = $scope.form.key;
        delete $scope.form.key;
        $http.put('/api/forms/' + key, $scope.form).
        success(function(data) {
            bindGrid(data);
            $scope.form = {};
            $scope.showModal=false;
        });
      }  
      else{//Add new
        $http.post('/api/forms/save', $scope.form).success(function(data) {
            bindGrid(data);
            $scope.form = {};
            $scope.showModal=false;
        });
      }
    };
    $scope.removeItem= function(row){
      $http.delete('/api/forms/' + row.key).
        success(function(data) {
          bindGrid(data);
      });
    };
    var bindGrid =function(data){
      $scope.forms=[];
      for(var key in data){
        var item = data[key];
        item.key =key;
        $scope.forms.push(item); 
      }
    };
    $http.get('/api/forms/getList').
      success(function(data, status, headers, config) {
         bindGrid(data);
    });
  });