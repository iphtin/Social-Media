import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: []
    },
    follow: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User