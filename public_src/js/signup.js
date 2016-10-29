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
    email.errorMessage = initErrorMessage(email.elem, 'Enter email address in the format "abcd@domain.com"');

    var password = {};
    password.elem = $('#password-account');
    password.value = '';
    password.isValid = false;
    password.errorMessage = initErrorMessage(password.elem, 'The password must follow the rules below');

    var passwordHelper = {};
    passwordHelper.elem = $('#password-helper');

    var passwordConfirm = {};
    passwordConfirm.elem = $('#password2-account');
    passwordConfirm.value = '';
    passwordConfirm.isValid = false;
    passwordConfirm.errorMessage = initErrorMessage(passwordConfirm.elem, 'Both passwords should match');

    var createAccountButton = {};
    createAccountButton.elem = $('#create-account');

    var passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;

    var areInputsAllValid = false;
    email.elem.on('keyup change blur', function() {
        isValidInput(email, email.validationRegExp);
        enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
    });

    password.elem.on('keyup change blur', function() {
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
     passwordConfirm.elem.on('keyup change blur', function() {
       isPasswordConfirmMatching(password,passwordConfirm, passwordValidation);
       enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
     });

    function isPasswordConfirmMatching(pw1,pw2, validationregexp) {
        pw2.value = pw2.elem.val();
        pw2.isValid = validationregexp.test(pw2.value);
        if (!pw2.value) {
            pw2.elem.removeClass();
            pw2.errorMessage.addClass('hide');
        }
        else if (!pw2.isValid || pw1.value !== pw2.value) {
            pw2.elem.removeClass('valid');
            pw2.elem.addClass('invalid');
            pw2.errorMessage.removeClass('hide');
        }
        else if (pw2.isValid && pw1.value === pw2.value) {
            pw2.elem.removeClass('invalid');
            pw2.elem.addClass('valid');
            pw2.errorMessage.addClass('hide');
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
