const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
    },
        password:{
            type: String
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
});

const User = mongoose.model('User', userSchema);

module.exports = User;