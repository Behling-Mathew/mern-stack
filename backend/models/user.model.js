const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        default: ''

    },
    password: {
        type: String,
        default: ''

    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, 

{
    timestamps: true,
});

userSchema.methods.generateHash = function(password){
    //return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;