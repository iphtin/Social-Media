import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  postImage: {
    type: String,
    default: ""
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

export default Post