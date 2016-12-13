angular.module('MyApp') // extending from previously created angular module in the First Part
.controller('LoginController', function ($scope, LoginService) {
    $scope.IsLogedIn = false;
    $scope.Message = '';
    $scope.Submitted = false;
    $scope.IsFormValid = false;
     
    $scope.LoginData = {
        Username: '',
        Password: ''
    };

    //Check is Form Valid or Not // Here f1 is our form Name
    $scope.$watch('f1.$valid', function (newVal) {
        $scope.IsFormValid = newVal;
    });
    //Check is Form Valid or Not // Here f1 is our form Name
    $scope.$watch('Reg.$valid', function (newVal) {
        $scope.isRegFormValid = newVal;
    });
    $scope.Login = function () {
        $scope.Submitted = true;
        if ($scope.IsFormValid) {
          //  alert('Login Failed!');
            $scope.Message = "Invalid Credential." ;
            //LoginService.GetUser($scope.LoginData).then(function (d) {
            //    if (d.data.Username != null) {
            //        $scope.IsLogedIn = true;
            //        $scope.Message = "Successfully login done. Welcome " + d.data.FullName;

            //    }
            //    else {
            //        alert('Invalid Credential!');
            //    }
            //});
        }
    };
     
    $scope.ForgetPassword = function (data) {
        $scope.Submitted = true;  
            //  alert('Login Failed!');
        $scope.Message = "Invalid password." + data.MobileNumber;
            //LoginService.GetUser($scope.LoginData).then(function (d) {
            //    if (d.data.Username != null) {
            //        $scope.IsLogedIn = true;
            //        $scope.Message = "Successfully login done. Welcome " + d.data.FullName;

            //    }
            //    else {
            //        alert('Invalid Credential!');
            //    }
            //});
        
    };

    //Default Variable
    $scope.submitText = "Save";
    $scope.submitted = false;
    $scope.message = '';
    $scope.isRegFormValid = false;
    $scope.User = {
        Username: '',
        Password: '',
        FullName: '',
        EmailID: '' 
    };

    //Save Data
    $scope.SaveData = function (data) {
        if ($scope.submitText == 'Save') {
         $scope.submitted = true;
            $scope.message = '';

            if ($scope.isRegFormValid) {
                $scope.submitText = 'Please Wait...';
                $scope.User = data;
                //RegistrationService.SaveFormData($scope.User).then(function (d) {
                //    alert(d);
                //    if (d == 'Success') {
                //        //have to clear form here
                //        ClearForm();
                //    }
                $scope.submitText = "Save";
                alert("sahi hai");
                //});
            }
             else {
                 alert("Galat hai");
                $scope.message = 'Please fill required fields value';
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
        $scope.Message = "" ;
    };

})
    
.factory('LoginService', function ($http) {
    var fac = {};
    fac.SaveFormData = function (data) {
        var defer = $q.defer();
        $http({
            url: '/Data/Register',
            method: 'POST',
            data: JSON.stringify(data),
            headers: {'content-type' : 'application/json'}
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
    fac.GetUser = function (d) {
        return $http({
            url: '/Data/UserLogin',
            method: 'POST',
            data: JSON.stringify(d),
            headers: { 'content-type': 'application/json' }
        });
    };



    return fac;
});