exports = {

    isValidEmail: (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
    },

    isValidPassword: (pw) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pw.value);
    },

    isPasswordConfirmMatching: (pw1, pw2) => {
        return pw1.value === pw2.value;
    }
}
