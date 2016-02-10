
/*taxExpiry Tax Expiry
passingExpiry Passing Expiry
permitExpiry Permit Expiry
licenseExpiry_Transport License Expiry (Transport)
licenseExpiry_NonTransport License Expiry (Non-Transport) 
insuranceExpiry Insurance Expiry*/

angular.module("myApp.controllers", [])
.controller("IndexCtrl", function ($rootScope, $scope, $http) {
    $scope.notifications ={};
    
    $http.get('/api/drivers/getExpiredRecord/taxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["taxExpiry_Expired"] = data;
    });
    $http.get('/api/drivers/getDueRecord/taxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["taxExpiry_Due"] = data;
    });
    $http.get('/api/drivers/getPendingRecord/taxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["taxExpiry_Pending"] = data;
    });

    $http.get('/api/drivers/getExpiredRecord/fitnessExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["fitnessExpiry_Expired"] = data;
    });
    $http.get('/api/drivers/getDueRecord/fitnessExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["fitnessExpiry_Due"] = data;
    });
    $http.get('/api/drivers/getPendingRecord/fitnessExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["fitnessExpiry_Pending"] = data;
    });


    $http.get('/api/drivers/getExpiredRecord/permitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["permitExpiry_Expired"] = data;
    });
    $http.get('/api/drivers/getDueRecord/permitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["permitExpiry_Due"] = data;
    });
    $http.get('/api/drivers/getPendingRecord/permitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["permitExpiry_Pending"] = data;
    });

    $http.get('/api/drivers/getExpiredRecord/nationalPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["nationalPermitExpiry_Expired"] = data;
    });
    $http.get('/api/drivers/getDueRecord/nationalPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["nationalPermitExpiry_Due"] = data;
    });
    $http.get('/api/drivers/getPendingRecord/nationalPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["nationalPermitExpiry_Pending"] = data;
    });

    $http.get('/api/drivers/getExpiredRecord/insuranceExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["insuranceExpiry_Expired"] = data;
    });
    $http.get('/api/drivers/getDueRecord/insuranceExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["insuranceExpiry_Due"] = data;
    });
    $http.get('/api/drivers/getPendingRecord/insuranceExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["insuranceExpiry_Pending"] = data;
    });

    $http.get('/api/drivers/getExpiredRecord/professionalTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["professionalTaxExpiry_Expired"] = data;
    });
    $http.get('/api/drivers/getDueRecord/professionalTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["professionalTaxExpiry_Due"] = data;
    });
    $http.get('/api/drivers/getPendingRecord/professionalTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["professionalTaxExpiry_Pending"] = data;
    });          

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
  .controller('vehicalCtrl',function($scope,$http,$filter,$routeParams, Upload, $timeout) {
    $scope.driver = {};
    $scope.drivers = [];
    $scope.log = '';
    
    $scope.expiryPicker = {opened: false};
    $scope.fitnessExpiryPicker = {opened: false};
    $scope.permitExpiryPicker = {opened: false};
    $scope.nationalPermitExpiryPicker = {opened: false};
    $scope.insuranceExpiryPicker = {opened: false};
    $scope.professionalTaxExpiryPicker = {opened: false};
    $scope.counterPermitExpiryPicker = {opened: false};
    $scope.counterTaxExpiryPicker = {opened: false};
    $scope.greenTaxExpiryPicker = {opened: false};
    
    $scope.openExpiryPicker = function() {$scope.expiryPicker.opened = true;};
    $scope.openFitnessExpiryPicker = function() {$scope.fitnessExpiryPicker.opened = true;};
    $scope.openPermitExpiryPicker = function() {$scope.permitExpiryPicker.opened = true;};
    $scope.openNationalPermitExpiryPicker = function() {$scope.nationalPermitExpiryPicker.opened = true;};
    $scope.openInsuranceExpiryPicker = function() {$scope.insuranceExpiryPicker.opened = true;};
    $scope.openProfessionalTaxExpiryPicker = function() {$scope.professionalTaxExpiryPicker.opened = true;};
    $scope.openCounterPermitExpiryPicker = function() {$scope.counterPermitExpiryPicker.opened = true;};
    $scope.openCounterTaxExpiryPicker = function() {$scope.counterTaxExpiryPicker.opened = true;};
    $scope.openGreenTaxExpiryPicker = function() {$scope.greenTaxExpiryPicker.opened = true;};
    

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
        var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09","10", "11", "12");
        var d = new Date(value);
        return (d.getDate() + " " + m_names[d.getMonth()] + " " + d.getFullYear());
    };
    var dateDiff = function(value){
      var date1 = new Date(value);
      var date2 = new Date();
      var timeDiff = date1.getTime()-date2.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    };

    $scope.getColorCode = function(value){
        if(value){
          var days = dateDiff(value);
          if(days<=10 &&  days>=0) return "green";
          if(days>=-30 && days<0) return "orange";
          if(days>=-45 && days<-31) return "red";
        }
        return "";
    };
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/upload',
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
    $scope.filterStatuses = [{id:0,description: "Select Status.."},{id:1,description: "Pending"},{id:2, description:"Overdue"},{id:3, description:"Expired"}];
    if($routeParams.status)
      $scope.filterStatus = parseInt($routeParams.status);
    else
      $scope.filterStatus =0;
    $scope.filters = [
        {id:1, text:'Tax'},
        {id:2, text:'Fitness'},
        {id:3, text:'Permit'},
        {id:4, text:'National Permit'},
        {id:5, text:'Insurance'},
        {id:6, text:'Prof. Tax'}
    ];
    if($routeParams.field)
      $scope.filters[parseInt($routeParams.field)].selected=true;   
    var isStatusOk = function(value){
        var days = dateDiff(value);
        switch ($scope.filterStatus){
          case 1:    
            return days<=10 &&  days>=0;
          case 2:
            return days>=-30 && days<0;
          case 3:
            return days>=-45 && days<-31;
          default: 
            return false 
        }
    };
    $scope.applyFilters = function(item){
        if($scope.filterStatus == 0 || 
            (!$scope.filters[0].selected && !$scope.filters[1].selected 
              && !$scope.filters[2].selected && !$scope.filters[3].selected 
              && !$scope.filters[4].selected && !$scope.filters[5].selected)
        ) return true; 
        
        if($scope.filters[0].selected && isStatusOk(item["taxExpiry"])) return true;
        if($scope.filters[1].selected && isStatusOk(item["fitnessExpiry"])) return true;
        if($scope.filters[2].selected && isStatusOk(item["permitExpiry"])) return true;
        if($scope.filters[3].selected && isStatusOk(item["nationalPermitExpiry"])) return true;
        if($scope.filters[4].selected && isStatusOk(item["insuranceExpiry"])) return true;
        if($scope.filters[5].selected && isStatusOk(item["professionalTaxExpiry"])) return true;
        return false;
    };
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
    var transformModel = function(){
        $scope.driver.taxExpiry = $scope.driver.taxExpiry? (new Date($scope.driver.taxExpiry)).getTime():null;
        $scope.driver.fitnessExpiry= $scope.driver.fitnessExpiry? (new Date($scope.driver.fitnessExpiry)).getTime():null;
        $scope.driver.permitExpiry= $scope.driver.permitExpiry?(new Date($scope.driver.permitExpiry)).getTime():null;
        $scope.driver.nationalPermitExpiry= $scope.driver.nationalPermitExpiry?(new Date($scope.driver.nationalPermitExpiry)).getTime():null;
        $scope.driver.insuranceExpiry= $scope.driver.insuranceExpiry?(new Date($scope.driver.insuranceExpiry)).getTime():null;
        $scope.driver.professionalTaxExpiry= $scope.driver.professionalTaxExpiry?(new Date($scope.driver.professionalTaxExpiry)).getTime():null;
        return $scope.driver;
    };
    $scope.save  = function(){
      if($scope.driver.key){ //update
        var key = $scope.driver.key;
        delete $scope.driver.key;
        $http.put('/api/drivers/' + key, transformModel()).
        success(function(data) {
            bindGrid(data);
            $scope.driver = {};
            $scope.showModal=false;
        });
      }  
      else{//Add new
        $http.post('/api/drivers/save', transformModel()).success(function(data) {
             if(data.error)
                alert(data.error);
            else{    
              bindGrid(data);
              $scope.driver = {};
              $scope.showModal=false;
            }
        });
      }
    };
    $scope.removeItem= function(row){
      $scope.driver = row;
      $scope.vehicleDelModal=true;
    };
    $scope.yes= function(){
      $http.delete('/api/drivers/'+ $scope.driver.key).success(function(data) {
          bindGrid(data);
          $scope.driver = {};
          $scope.vehicleDelModal=false;
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