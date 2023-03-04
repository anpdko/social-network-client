import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"
import authHeader from '../../services/Auth/header'
import authService from '../../services/Auth/auth.service'
import { authLogout } from '../auth/authSlice'

const API_URL = process.env.REACT_APP_API_URL 

const initialState = {
   posts: [],
   loading: null,
   error: null
}

// тестовый коментарий

export const getBookmarkPosts = createAsyncThunk(
   'posts/getBookmarkPosts',
   async (_, thunkAPI) => {
      try{
         const res = await axios.get(API_URL + 'api/posts/bookmark/all', {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         thunkAPI.dispatch(setPosts(res.data))
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         else{
            return thunkAPI.rejectWithValue(error.message)
         }
      }
   }
)

export const getPosts = createAsyncThunk(
   'posts/getPosts',
   async ({page}, thunkAPI) => {
      try{
         const res = await axios.get(API_URL + 'api/posts/all?page='+ page, {
            headers: authHeader()
         })
         console.log("res: ", res)
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         console.log("page", res.data.page)
         if(res.data.page === 1){
            thunkAPI.dispatch(setPosts(res.data))
         }
         else{
            thunkAPI.dispatch(addArrPosts(res.data))
         }
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         else{
            return thunkAPI.rejectWithValue(error.message)
         }
      }
   }
)

export const getGlobalPosts = createAsyncThunk(
   'posts/getGlobalPosts',
   async ({page}, thunkAPI) => {
      try{
         const res = await axios.get(API_URL + 'api/posts/global/all?page='+ page)
         console.log(res)
         console.log("page", res.data.page)
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         if(res.data.page === 1){
            thunkAPI.dispatch(setPosts(res.data))
         }
         else{
            thunkAPI.dispatch(addArrPosts(res.data))
         }
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         else{
            return thunkAPI.rejectWithValue(error.message)
         }
      }
   }
)

export const getPostsFollowing = createAsyncThunk(
   'posts/getPostsFollowing',
   async ({page}, thunkAPI) => {
      try{
         const res = await axios.get(`${API_URL}api/posts/following?page=${page}`, {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         res.data.page === 1
            ?thunkAPI.dispatch(setPosts(res.data))
            :thunkAPI.dispatch(addArrPosts(res.data))
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         else{
            return thunkAPI.rejectWithValue(error.message)
         }
      }
   }
)

export const getPostsUser = createAsyncThunk(
   'posts/getPostsUser',
   async ({userId, page}, thunkAPI) => {
      try{
         const res = await axios.get(`${API_URL}api/posts/all/${userId}?page=${page}`, {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         res.data.page === 1
            ?thunkAPI.dispatch(setPosts(res.data))
            :thunkAPI.dispatch(addArrPosts(res.data))
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         else{
            return thunkAPI.rejectWithValue(error.message)
         }
      }
   }
)

export const createPost = createAsyncThunk(
   'posts/createPost',
   async (data, thunkAPI) => {
      try{
         const res = await axios.post(API_URL + 'api/posts', {
            body: data.body,
            userId: data.userId,
            like: []
         },{
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         thunkAPI.dispatch(addPost(res.data))
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const createCommentPost = createAsyncThunk(
   'posts/createCommentPost',
   async (data, thunkAPI) => {
      try{
         const res = await axios.post(API_URL + 'api/posts/comments/add', {
            comment: data.comment,
            postId: data.postId,
         },{
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         thunkAPI.dispatch(addComment({postId: data.postId, data: res.data}))
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const delayPost = createAsyncThunk(
   'posts/delayPost',
   async (id, thunkAPI) => {
      try{
         const res = await axios.delete(API_URL + 'api/posts/'+ id, {
            headers: authHeader()
        })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         thunkAPI.dispatch(removePost(id))
      }
      catch(error){
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const getBookmark = createAsyncThunk(
   'posts/getBookmark',
   async (postId, thunkAPI) => {
      axios.get(API_URL + 'api/bookmark/' + postId, {
            headers: authHeader()
         })
      .then(res => {
         thunkAPI.dispatch(bookmaekPost(postId))
      })
      .catch(error => {
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         return thunkAPI.rejectWithValue(error.message)
      })
   }
)

export const getLike = createAsyncThunk(
   'posts/getLike',
   async (postId, thunkAPI) => {
      axios.get(API_URL + 'api/posts/like/' + postId, {
         headers: authHeader()
      })
      .then(res => {
         thunkAPI.dispatch(likePost(postId))
      })
      .catch(error => {
         if(authService.isAuth(error.response.status)){
            thunkAPI.dispatch(authLogout())
         }
         return thunkAPI.rejectWithValue(error.message)
      })
   }
)



export const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      setPosts: (state, action) => {
         console.log("Заменяю. Страница: ", action.payload)
         state.posts = action.payload.posts
      },
      addArrPosts: (state, action) => {
         state.posts = [...state.posts, ...action.payload.posts]
      },
      addPost: (state, action) => {
         state.posts.unshift({...action.payload, like: 0, countLike: 0})
      },
      removePost: (state, action) => {
         state.posts = state.posts.filter(post => {
            return post._id !== action.payload
         })
      },
      bookmaekPost: (state, action) => {
         state.posts = state.posts.map(post => {
            if(post._id === action.payload){
               return {...post, isBookmark: !post.isBookmark}
            }
            return post

         })
      },
      likePost: (state, action) => {
         state.posts = state.posts.map(post => {
            if(post._id === action.payload){
               return {...post, like: !post.like, countLike: post.like?post.countLike-1:post.countLike+1}
            }
            return post

         })
      },
      addComment: (state, action) => {
         state.posts = state.posts.map(post => {
            if(action.payload.postId === post._id){
               const comments = post.comments
               comments.push(action.payload.data)
               return { ...post, comments: comments, commentsCount: post.commentsCount+1 }
            }
            return post
         })
      }
   },
   extraReducers: {
      //getPosts
      [getPosts.pending]: (state) => {
         state.loading = true
         state.error = ''
      },
      [getPosts.fulfilled]: (state) => {
         state.loading = false
      },
      [getPosts.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload
      },

      //getGlobalPosts
      [getGlobalPosts.pending]: (state) => {
         state.loading = true
         state.error = ''
      },
      [getGlobalPosts.fulfilled]: (state) => {
         state.loading = false
      },
      [getGlobalPosts.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload
      },
      
      //getPostsUser
      [getPostsUser.pending]: (state) => {
         state.loading = true
         state.error = ''
      },
      [getPostsUser.fulfilled]: (state) => {
         state.loading = false
      },
      [getPostsUser.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload
      },

      //getBookmarkPosts
      [getBookmarkPosts.pending]: (state) => {
         state.loading = true
         state.error = ''
      },
      [getBookmarkPosts.fulfilled]: (state) => {
         state.loading = false
      },
      [getBookmarkPosts.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload
      },

      //createPost
      [createPost.pending]: (state) => {
         state.loading = true
         state.error = ''
      },
      [createPost.fulfilled]: (state) => {
         state.loading = false
      },
      [createPost.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload
      }
   }
})

export const { setPosts, addArrPosts, addPost, removePost, bookmaekPost, likePost, addComment } = postSlice.actions

export default postSlice.reducer