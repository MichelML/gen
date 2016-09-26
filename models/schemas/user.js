const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match:/^[A-Za-z\s]+$/
    },
    email: {
        type: String,
        require:true,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        lowercase:true
    },
    pw: {
        type: String,
        require:true,
        match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    },
    loggedInCount: {
        type: Number,
        default: 1
    }
});
