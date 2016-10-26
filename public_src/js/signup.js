$(document).ready(function () {
    $('.tooltipped').each(function(index, element) {
        var span = $('#' + $(element).attr('data-tooltip-id') + '>span:first-child');
        span.before($(element).attr('data-tooltip'));
        span.remove();
    });
    var email = {};
    email.elem = $('#email-account');

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
        enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
    });

    password.elem.on('keyup', function() {
       isValidPassword(password); 
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
       isValidPassword(passwordConfirm); 
       isPasswordConfirmMatching(password,passwordConfirm);
       enableCreateAccountButton(email,password,passwordConfirm,createAccountButton, areInputsAllValid);
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
