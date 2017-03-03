 
        function SubmitsEncry() {
            debugger;
            var txtUserName = $('#Username').val();
            var txtpassword = $('#Password').val();

            if (txtUserName == "") {
                alert('Please enter UserName');
                return false;
            }
            else if (txtpassword == "") {
                alert('Please enter Password');
                return false;
            }
            else {
                var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

                var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(txtUserName), key,

                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

                $('#HDUser').val(encryptedlogin);

                var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(txtpassword), key,

                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

                $('#HDpass').val(encryptedpassword);

                alert('encrypted Username :' + encryptedlogin);
                alert('encrypted password :' + encryptedpassword);
            }
        }
    