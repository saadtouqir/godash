// Define the Mongoose models for the User collection in MongoDB. 
// This model will be used to create, read, update, and delete user data in the database. 
// The User model includes fields for username, email, password, and createdAt timestamp.
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);