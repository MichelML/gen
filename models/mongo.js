const mongoose = require('mongoose'),
      schema = require('./schemas/user.js'),
      uri = 'mongodb://localhost:27017/example',
      User = mongoose.model('User', schema, 'users')

let user = new User({
    name: 'Michel Moreau',
    email: 'michmoreau.l@gmail.com',
    pw: 'Test101'
});

var createUser = user.save(); 

createUser.then(() => {

    let getUser = User.find({email:'michmoreau.l@gmail.com'});

    getUser.then((docs) => {
        console.log(require('util').inspect(docs));
    });

});

