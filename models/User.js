// Import the mongoose module
import mongoose from 'mongoose';

// Create a schema for your model named UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

// Using your UserSchema, generate a model named User
const User = mongoose.model('User', UserSchema);

// Export the User model to make it accessible to the rest of your application
export default User;