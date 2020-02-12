const mongoose = require('mongoose');
const { Schema } = mongoose;



const UserSchema = new Schema({
    username: {
        type: String,
        default: 'unknown'
    },
    
    comment: {
        type: String,
        required: "comment is required"
    },
    
    date: {
        type: Date,
        default: Date.now()
    }
});




// console.log(UserSchema)
const User = mongoose.model('User', UserSchema);
console.log(User)
module.exports = User;