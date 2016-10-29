$(document).ready(function () {
    $('.tooltipped').each(function(index, element) {
        var span = $('#' + $(element).attr('data-tooltip-id') + '>span:first-child');
        span.before($(element).attr('data-tooltip'));
        span.remove();
    });

    var email = {};
    email.elem = $('#email-account');
    email.value = '';
    email.isValid = false;
    email.validationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var password = {};
    password.elem = $('#password-account');
    password.value = '';
    password.isValid = false;

    var passwordHelper = {};
    passwordHelper.elem = $('#password-helper');

    var passwordConfirm = {};
    passwordConfirm.elem = $('#password2-account');
    passwordConfirm.value = '';
    passwordConfirm.isValid = false;

    var createAccountButton = {};
    createAccountButton.elem = $('#create-account');

    var passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    var areInputsAllValid = false;
    email.elem.on('keyup', function() {
        isValidInput(email, email.validationRegExp);
        enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
    });

    password.elem.on('keyup', function() {
       isValidInput(password, passwordValidation); 
       enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
       shouldShowHelper(password,passwordHelper);
     });
    password.elem.on('focus', function() {
       shouldShowHelper(password,passwordHelper);
     });
    password.elem.on('blur', function() {
       passwordHelper.elem.addClass('hide');
     });
     passwordConfirm.elem.on('keyup', function() {
       isValidInput(passwordConfirm, passwordValidation); 
       isPasswordConfirmMatching(password,passwordConfirm);
       enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
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

    function isPasswordConfirmMatching(pw1,pw2) {
        if (!pw2.isValid) {
            return;
        }
        else if (pw2.isValid && pw1.value !== pw2.value) {
            pw2.elem.removeClass('valid');
            pw2.elem.addClass('invalid');
        }
        else if (pw2.isValid && pw1.value === pw2.value) {
            pw2.elem.removeClass('invalid');
            pw2.elem.addClass('valid');
        }
    }

    function enableCreateAccountButton(mail,pw1,pw2,accountButton,areInputsValid) {
       areInputsValid = mail.elem.hasClass('valid') && pw1.elem.hasClass('valid') && pw2.elem.hasClass('valid'); 
       if (!areInputsValid) {
            accountButton.elem.prop('disabled', true);   
        } 
        else {
            accountButton.elem.prop('disabled', false);   
        }
    }

    function shouldShowHelper(pw,helper) {
        if (!pw.elem.hasClass('valid')) {
            helper.elem.removeClass('hide');    
        }
        else {
            helper.elem.addClass('hide');
        }
    }
});
