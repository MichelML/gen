$(document).ready(function () {
   
    var email = {};
    email.elem = $('#email-account');
    email.value = '';
    email.isValid = false;
    email.validationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email.errorMessage = initErrorMessage(email.elem, 'Enter email address in the format "abcd@domain.com"');

    var password = {};
    password.elem = $('#password-account');
    password.value = '';
    password.isValid = false;

    var passwordValidation = /^.{1,20}$/;

    var signinButton = {};
    signinButton.elem = $('#signin-button');

    var areInputsAllValid = false;

    email.elem.on('keyup blur change', function() {
       isValidInput(email, email.validationRegExp);
       enableSigninButton(email,password,signinButton, areInputsAllValid);
     });

    password.elem.on('keyup blur change', function() {
       isValidInput(password, passwordValidation); 
       enableSigninButton(email,password,signinButton, areInputsAllValid);
     });

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
