const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String, 
        trim: true,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});

const User = mongoose.model('User', userSchema);
module.exports = User; 