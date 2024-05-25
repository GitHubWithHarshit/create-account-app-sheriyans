const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crudapp');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    Image: String,
}) ;

module.exports = mongoose.model('user', userSchema);
