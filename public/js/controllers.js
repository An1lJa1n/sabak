angular.module("myApp.controllers", [])
.controller("IndexCtrl", function ($rootScope, $scope, $http) {
    $scope.notifications ={};
    var getRecordCount = function(items){
      var count= 0;
      for(var i in items) count++;
      return count;  
    };
    /*var fieldList = ["taxExpiry","fitnessExpiry","permitExpiry","nationalPermitExpiry","insuranceExpiry","professionalTaxExpiry","counterTaxExpiry","counterPermitExpiry"];
    var statuses = ["Due","Expired","Overdue"];
    for (var i=0;i<fieldList.length;i++){
      for (var j=0;j<statuses.length;j++){
          $http.get('/api/drivers/get' + statuses[j] +'Record/' + fieldList[i]).
            success(function(data, status, headers, config) {
              $scope.notifications["taxExpiry_" + statuses[j]] = getRecordCount(data);
          });
      }
    }  
    */
    $http.get('/api/drivers/getExpiredRecord/taxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["taxExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/taxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["taxExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/taxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["taxExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/fitnessExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["fitnessExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/fitnessExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["fitnessExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/fitnessExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["fitnessExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/permitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["permitExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/permitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["permitExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/permitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["permitExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/nationalPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["nationalPermitExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/nationalPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["nationalPermitExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/nationalPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["nationalPermitExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/insuranceExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["insuranceExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/insuranceExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["insuranceExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/insuranceExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["insuranceExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/professionalTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["professionalTaxExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/professionalTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["professionalTaxExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/professionalTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["professionalTaxExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/counterTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["counterTaxExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/counterTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["counterTaxExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/counterTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["counterTaxExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/counterPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["counterPermitExpiry_Expired"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getDueRecord/counterPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["counterPermitExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/counterPermitExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["counterPermitExpiry_Overdue"] = getRecordCount(data);
    });

    $http.get('/api/drivers/getExpiredRecord/greenTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["greenTaxExpiry_Expired"] = getRecordCount(data);
    }); 
    $http.get('/api/drivers/getDueRecord/greenTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["greenTaxExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/greenTaxExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["greenTaxExpiry_Overdue"] = getRecordCount(data);
    });  

    $http.get('/api/drivers/getExpiredRecord/HChemExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["HChemExpiry_Expired"] = getRecordCount(data);
    }); 
    $http.get('/api/drivers/getDueRecord/HChemExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["HChemExpiry_Due"] = getRecordCount(data);
    });
    $http.get('/api/drivers/getOverdueRecord/HChemExpiry').
      success(function(data, status, headers, config) {
        $scope.notifications["HChemExpiry_Overdue"] = getRecordCount(data);
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
            name: 'Drivers',
            link: '/driverServices'
          }, {
            name: 'Change Password',
            link: '/changePassword'
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
  .controller('vehicalCtrl',function($scope,$http,$filter,$routeParams, Upload, $timeout, FileSaver) {
    $scope.displayDrivers = [];
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
    $scope.HChemExpiryPicker = {opened: false};
    $scope.openExpiryPicker = function() {$scope.expiryPicker.opened = true;};
    $scope.openFitnessExpiryPicker = function() {$scope.fitnessExpiryPicker.opened = true;};
    $scope.openPermitExpiryPicker = function() {$scope.permitExpiryPicker.opened = true;};
    $scope.openNationalPermitExpiryPicker = function() {$scope.nationalPermitExpiryPicker.opened = true;};
    $scope.openInsuranceExpiryPicker = function() {$scope.insuranceExpiryPicker.opened = true;};
    $scope.openProfessionalTaxExpiryPicker = function() {$scope.professionalTaxExpiryPicker.opened = true;};
    $scope.openCounterPermitExpiryPicker = function() {$scope.counterPermitExpiryPicker.opened = true;};
    $scope.openCounterTaxExpiryPicker = function() {$scope.counterTaxExpiryPicker.opened = true;};
    $scope.openGreenTaxExpiryPicker = function() {$scope.greenTaxExpiryPicker.opened = true;};
    $scope.openHChemExpiryPicker=function() {$scope.HChemExpiryPicker.opened = true;};

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
    $scope.MyFiles=[];

    $scope.uploadCSV=function(e,files){
        var reader=new FileReader();
        reader.onload=function(e){
            var string=reader.result;
            var obj=$filter('csvToObj')(string);
            for(var i=0;i<obj.length;i++){
                $scope.driver= obj[i];
                $http.post('/api/drivers/save', transformModel()).success(function(data) {
                     if(data.error)
                        alert(data.error);
                    else{    
                      bindGrid(data);
                    }
                });
            }
        }
        reader.readAsText(files[0]);
    };
    
    $scope.downloadCSV = function(){
        alasql.fn.formatDate = function(value) {
          return $scope.formatDate(value);
        };
        var mystyle = {
          headers:true, 
          column: {style:{Font:{Bold:"1"}}},
          rows: {1:{style:{Font:{Color:"#FF0077"}}}},
          cells: {1:{1:{
            style: {Font:{Color:"#00FFFF"}}
          }}}
        };
        alasql('SELECT vehicalNumber,chasis,\
          engineDetails,owner,mobile,address,tax,formatDate(taxExpiry) AS taxExpiry,\
          formatDate(fitnessExpiry) AS fitnessExpiry,formatDate(permitExpiry) AS permitExpiry,formatDate(nationalPermitExpiry) AS nationalPermitExpiry,\
          formatDate(insuranceExpiry) AS insuranceExpiry,professionalTax,formatDate(professionalTaxExpiry) AS professionalTaxExpiry,\
          formatDate(greenTaxExpiry) AS greenTaxExpiry,formatDate(counterTaxExpiry) AS counterTaxExpiry,formatDate(counterPermitExpiry) AS counterPermitExpiry, \
          formatDate(HChemExpiry) AS HChemExpiry INTO XLSXML("sabak.xls",?) FROM ?',[mystyle,$scope.stSafeSrc]);
    };
    $scope.getColorCode = function(value){
        if(value){
          var days = dateDiff(value);
          if(days<=30 &&  days>=0) return "#53D84E";
          if(days>=-15 && days<0) return "#F78C2D";
          if(days>=-60 && days<-16) return "#EE3642";
        }
        return "";
    };
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              $scope.files = files;
              /*var file = files[i];
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
              }*/
            }
        }
    };
    $scope.filterStatuses = [{id:0,description: "Select Status.."},{id:1,description: "Due"},{id:2, description:"Expired"},{id:3, description:"Overdue"}];
    if($routeParams.status)
      $scope.filterStatus = parseInt($routeParams.status);
    else
      $scope.filterStatus =0;
    $scope.filters = [
        {id:1, text:'Tax', predicate: "taxExpiry"},
        {id:2, text:'Fitness', predicate: "fitnessExpiry"},
        {id:3, text:'Permit', predicate: "permitExpiry"},
        {id:4, text:'National Permit', predicate: "nationalPermitExpiry"},
        {id:5, text:'Insurance', predicate: "insuranceExpiry"},
        {id:6, text:'Prof.',predicate: "professionalTaxExpiry"},
        {id:7, text:'Green',predicate: "greenTaxExpiry"},
        {id:8, text:'H.Chem',predicate: "HChemExpiry"}
    ];
    if($routeParams.field)
      $scope.filters[parseInt($routeParams.field)].selected=true;   
    $scope.isDefaultSorted = function(index){
      return index==$routeParams.field;
    };
    var isStatusOk = function(value){
        var days = dateDiff(value);
        switch ($scope.filterStatus){
          case 1:    
            return days<=30 &&  days>=0;
          case 2:
            return days>=-15 && days<0;
          case 3:
            return days>=-60 && days<-16;
          default: 
            return false 
        }
    };
    
    $scope.filterChanged = function(){
       $scope.stSafeSrc= []; 
       angular.forEach($scope.drivers, function(value, key) {
          if($scope.applyFilters(value))
            $scope.stSafeSrc.push(value);
      });
    };
    $scope.applyFilters = function(item){
        if($scope.filterStatus == 0 || 
            (!$scope.filters[0].selected && !$scope.filters[1].selected && !$scope.filters[2].selected 
              && !$scope.filters[3].selected && !$scope.filters[4].selected 
              && !$scope.filters[5].selected && !$scope.filters[6].selected && !$scope.filters[7].selected)
        ) return true; 
        
        if($scope.filters[0].selected && isStatusOk(item["taxExpiry"])) return true;
        if($scope.filters[1].selected && isStatusOk(item["fitnessExpiry"])) return true;
        if($scope.filters[2].selected && isStatusOk(item["permitExpiry"])) return true;
        if($scope.filters[3].selected && isStatusOk(item["nationalPermitExpiry"])) return true;
        if($scope.filters[4].selected && isStatusOk(item["insuranceExpiry"])) return true;
        if($scope.filters[5].selected && isStatusOk(item["professionalTaxExpiry"])) return true;
        if($scope.filters[6].selected && isStatusOk(item["greenTaxExpiry"])) return true;
        if($scope.filters[7].selected && isStatusOk(item["HChemExpiry"])) return true;
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
        $scope.driver.greenTaxExpiry= $scope.driver.greenTaxExpiry?(new Date($scope.driver.greenTaxExpiry)).getTime():null;
        $scope.driver.counterTaxExpiry= $scope.driver.counterTaxExpiry?(new Date($scope.driver.counterTaxExpiry)).getTime():null;
        $scope.driver.counterPermitExpiry= $scope.driver.counterPermitExpiry?(new Date($scope.driver.counterPermitExpiry)).getTime():null;
        $scope.driver.HChemExpiry= $scope.driver.HChemExpiry?(new Date($scope.driver.HChemExpiry)).getTime():null;
        return $scope.driver;
    };
    $scope.save  = function(){
       var dataSaveFn= function(){
          if($scope.driver.key){ //update
            var key = $scope.driver.key;
            delete $scope.driver.key;
            $http.put('/api/drivers/' + key, transformModel()).
            success(function(data) {
                //bindGrid(data);
                $scope.driver = {};
                $scope.showModal=false;
            });
          }  
          else{//Add new
            var item = transformModel();
            $http.post('/api/drivers/save', transformModel()).success(function(data) {
                 if(data.error)
                    alert(data.error);
                else{    
                  $scope.drivers.push(item);
                  $scope.stSafeSrc.push(item);
                  $scope.driver = {};
                  $scope.showModal=false;
                }
            });
          }
       };
       if (this.entryForm.file.$valid && this.entryForm.file.$modelValue) { //check if from is valid
               var file = this.entryForm.file.$modelValue;
               file.prefix = $scope.driver.vehicalNumber;
               file.datetimestamp =  Date.now();
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
                        $scope.driver.attachment = resp.config.data.file.name;
                        dataSaveFn();
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + 
                      '% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                });
       }else
          dataSaveFn();
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
      $scope.stSafeSrc = [].concat($scope.drivers);
    };

    $http.get('/api/drivers/getList').
      success(function(data, status, headers, config) {
         bindGrid(data);
         $scope.filterChanged();
    });
    $scope.downloadAttachment = function(fileName){
        $http.post('/api/download', {filename: $scope.driver.attachment},{responseType:'blob'}).then(function(response) {
          var blob = new Blob([response.data]);
          var fileName = response.headers('content-disposition');
          FileSaver.saveAs(blob, fileName);
        }, function(response) {
          console.log('Download error');
          console.log(response);
        });
    };  
  })



  .controller('driversCtrl',function($scope,$http,$filter) {
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
      else{
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
  })
.controller('passwordCtrl',function($scope,$http) {
      $scope.currentPassReqd=false;
      $scope.newPassRequired=false;
      $scope.save = function(){
        var fail=0;
        if(!$scope.currentPass)
        {
          $scope.currentError="Kindly enter current passsword";
          $scope.currentPassReqd=true;
          fail=1;
        }else if($scope.currentPass){ /*Check  current password*/
          $scope.currentError="Kindly enter correct password";
          $scope.currentPassReqd=true;
          fail=1;
        }

        if(!$scope.newPassword)
        {
          $scope.newPassError="Kindly enter new passsword";
          $scope.newPassRequired=true;
          fail=1;
        }else if($scope.newPassword.length<6){
          $scope.newPassError="Password should be atleast 6 characters long.";
          $scope.newPassRequired=true;
          fail=1;
        }

        if(fail==0){

        }
      };
  });