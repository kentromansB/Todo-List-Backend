const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
        title: {
            type: String,
            required: true,
    },
        description:{
            type: String
        },
        deadline: {
            type: Date,
            
        },
        completed:{
            type: Boolean,
        },
        username: {
            type: String,
            ref: 'User'
        },
        user_id: {
            type: String,
            ref: 'User'
        }
       
});

const Todo = mongoose.model('Tasks', toDoSchema);

module.exports = Todo;