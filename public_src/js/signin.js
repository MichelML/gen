$(document).ready(function () {
   
    var email = {};
    email.elem = $('#email-account');

    var password = {};
    password.elem = $('#password-account');
    password.value = '';
    password.isValid = false;

    var passwordValidation = /^[a-zA-Z0-9]{1,20}$/;

    var signinButton = {};
    signinButton.elem = $('#signin-button');

    var areInputsAllValid = false;

    email.elem.on('keyup', function() {
       enableSigninButton(email,password,signinButton, areInputsAllValid);
     });

    password.elem.on('keyup', function() {
       isValidPassword(password); 
       enableSigninButton(email,password,signinButton, areInputsAllValid);
     });

    function isValidPassword(pw) {
        pw.value = pw.elem.val();
        pw.isValid = passwordValidation.test(pw.value);
        if (!pw.value) {
            pw.elem.removeClass()
         }
        else if (pw.isValid) {
            pw.elem.removeClass('invalid');
            pw.elem.addClass('valid');
        }
        else {
            pw.elem.removeClass('valid');
            pw.elem.addClass('invalid');
        }
    }

    function enableSigninButton(mail,pw1,accountButton,areInputsValid) {
       areInputsValid = mail.elem.hasClass('valid') && pw1.elem.hasClass('valid'); 
       if (!areInputsValid) {
            accountButton.elem.prop('disabled', true);   
        } 
        else {
            accountButton.elem.prop('disabled', false);   
        }
    }
});
