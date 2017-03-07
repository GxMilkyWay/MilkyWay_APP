var APIurl = "http://localhost:61780/";
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
            // alert('Login Failed!');
            $scope.LoginData;
            // $scope.Message = "Invalid Credential." ;
            LoginService.GetUser($scope.LoginData).then(function (d) {
                debugger;
                if (d.data == true) {
                    $scope.IsLogedIn = true;
                    $scope.Message = "Successfully login done. Welcome " + d.data;

                }
                else {
                   // $('#User').val('');
                   // $('#User').val(as);
                    alert('Invalid Credential!');
                }
            });
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
        MobileNumber: '',
        UserType: '',
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


.factory('LoginService', function ($http) {
    var fac = {};
    fac.SaveFormData = function (data) {
        var defer = $q.defer();
        $http({
            url: APIurl + 'Data/Register',
            method: 'Get',
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
    fac.GetUser = function (d) {
        SubmitsEncry(d);
       // as = '';
        // as= d.Username;      
        //d.Username = $('#hdnusername').val();
        d.Password = $('#hdnpassword').val();     
       
        jQuery.support.cors = true;
        return $http({

            crossOrigin: true,
            url: APIurl + 'Regis/verify/',
            method: 'POST',
            data: $.param(d),
            //dataType: 'json',
             //params: {"Username":"ss","Password":"ps"},
            // data: d,//{Username: "ss", Password: "ps" },
            beforeSend: function (request) { apiRequestclient.setRequestHeader; },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }

        });
       
    };


     
    return fac;
});
var as = '';
var apiRequestclient = {
    setRequestHeader: function (xhr) {
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    }
}
var encryptedlogin;
var encryptedpassword;
function SubmitsEncry(controls) {
    encryptedlogin='';
      encryptedpassword='';
   // var txtUserName = controls.Username;
    var txtpassword = controls.Password;

   // if (txtUserName == "") {
    //    alert('Please enter UserName');
   //     return false;
    // }
//else if (txtpassword == "") {
      if (txtpassword == "") {
        alert('Please enter Password');
        return false;
    }
    else {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

         // encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(txtUserName), key,

       // { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

       // $('#HDUser').val(encryptedlogin);

          encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(txtpassword), key,

        { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

         // $('#hdnusername').val(encryptedlogin);
          $('#hdnpassword').val(encryptedpassword);

       // alert('encrypted Username :' + encryptedlogin);
       // alert('encrypted password :' + encryptedpassword);
    }
}