import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  Posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setPosts: (state, action) => {
      state.Posts = action.payload.Posts; // Replace the current posts with the new posts
    },
    setPost: (state, action) => {
      const { Posts } = action.payload; // Changed 'post' to 'Posts'
    
      if (!Posts || !Posts._id) {
        console.error('Invalid post object:', Posts);
        return;
      }
    
      const updatedPosts = state.Posts.map((existingPost) => {
        if (existingPost._id === Posts._id) {
          return Posts;
        }
        return existingPost;
      });
    
      state.Posts = updatedPosts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        const { _id, username, profileImage } = action.payload.following;
        const friend = { _id, username, profileImage };
    
        if (state.user.following.some(f => f._id === friend._id)) {
          state.user.following = state.user.following.filter(f => f._id !== friend._id);
        } else {
          state.user.following = [...state.user.following, friend];
        }
      } else {
        console.error("user friends non-existent :(");
      }
    },    
    // setFollowing: (state, action) => {
    //   state.following = [...state.following, action.payload.following];
    // },
  },
})


export const { setPosts, setLogin, setLogout, setFriends, setPost } = postsSlice.actions

export default postsSlice.reducer