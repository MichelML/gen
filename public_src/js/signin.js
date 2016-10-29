$(document).ready(function () {
   
    var email = {};
    email.elem = $('#email-account');
    email.value = '';
    email.isValid = false;
    email.validationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var password = {};
    password.elem = $('#password-account');
    password.value = '';
    password.isValid = false;

    var passwordValidation = /^[a-zA-Z0-9]{1,20}$/;

    var signinButton = {};
    signinButton.elem = $('#signin-button');

    var areInputsAllValid = false;

    email.elem.on('keyup', function() {
       isValidInput(email, email.validationRegExp);
       enableSigninButton(email,password,signinButton, areInputsAllValid);
     });

    password.elem.on('keyup', function() {
       isValidInput(password, passwordValidation); 
       enableSigninButton(email,password,signinButton, areInputsAllValid);
     });

    function isValidInput(element, validationregexp) {
        element.value = element.elem.val();
        element.isValid = validationregexp.test(element.value);
        if (!element.value) {
            element.elem.removeClass()
         }
        else if (element.isValid) {
            element.elem.removeClass('invalid');
            element.elem.addClass('valid');
        }
        else {
            element.elem.removeClass('valid');
            element.elem.addClass('invalid');
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
