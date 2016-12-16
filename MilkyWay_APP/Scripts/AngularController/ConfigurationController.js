angular.module('MyApp') // extending from previously created angular module in the First Part
.controller('ConfigurationController', function ($scope, ConfigurationServices) {

   
    //drop down data

    //$scope.names = ["Liter", "Gallon", "Pounds(Lbs)"];
    $scope.Dropdowndata = [
   { id: "1", name: "Liter" },
   { id: "2", name: "Gallon" },
   { id: "3", name: "Pounds(Lbs)" }
    ];
     
    $scope.DropdownQty = [
 { Qid: "1", Qname: "0.5" },
 { Qid: "2", Qname: "1" },
 { Qid: "3", Qname: "1.5" },
    { Qid: "4", Qname: "2" },
 { Qid: "5", Qname: "2.5" },
 { Qid: "6", Qname: "3" }
    ];
    //Check is Form Valid or Not // Here f1 is our form Name
    $scope.$watch('ConfigForm.$valid', function (newVal) {
        $scope.isRegFormValid = newVal;
    });

    //Default Variable
    $scope.submitText = "Save";
    $scope.submitted = false;
    $scope.message = '';
    $scope.isRegFormValid = false;
    //$scope.ConfigData = {
    //    MeasurementID: '',
    //    Rate: ''
    //    //,
    //   // Quantity: ''
    //};

    
    //Save Data
    $scope.SaveData = function (data) {
        if ($scope.submitText == 'Save') {
            $scope.submitted = true;
            $scope.message = '';
           
            if ($scope.isRegFormValid) {
                $scope.submitText = 'Please Wait...';
                
                //RegistrationService.SaveFormData($scope.User).then(function (d) {
                //    alert(d);
                //    if (d == 'Success') {
                //        //have to clear form here
                //        ClearForm();
                //    }
                $scope.submitText = "Save";
                alert("sahi hai" + data.MeasurementID);
                //});
            }
            else {
                // alert("Galat hai");
                // $scope.message = 'Please fill required fields value';
            }
        }
    }
    //Clear Form (reset)
    function ClearForm() {
        $scope.User = {};
        $scope.Reg.$setPristine(); //here f1 our form name
        $scope.submitted = false;
    }

    $scope.changeEvent = function () {
        $scope.Message = "";
    };

})

.factory('ConfigurationServices', function ($http) {
    var fac = {};
    fac.SaveFormData = function (data) {
        var defer = $q.defer();
        $http({
            url: '/Data/Register',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            // Success callback
            defer.resolve(d);
        }).error(function (e) {
            //Failed Callback
            alert('Error!');
            defer.reject(e);
        });
        return defer.promise;
    }


    return fac;
});