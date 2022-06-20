import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authLogout } from '../auth/authSlice'
import authService from '../../services/Auth/auth.service'
import axios from "axios"
import authHeader from '../../services/Auth/header'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
   user: null,
   isLoggedIn: false,
   message: null
}

export const getUser = createAsyncThunk(
   'posts/getUser',
   async (userId, thunkAPI) => {
      try{
         const res = await axios.get(API_URL + 'api/user/'+ userId, {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error('Server error');
         }
         thunkAPI.dispatch(setUser(res.data))
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

//Подписаться
export const setSubscribe = createAsyncThunk(
   'post/setSubscribe',
   async (userId, thunkAPI) => {
      try{
         await axios.get(API_URL + 'api/user/subscribe/'+ userId, {
            headers: authHeader()
         })
         thunkAPI.dispatch(subscribe())
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

// Отписаться
export const setUnsubscribe = createAsyncThunk(
   'post/setUnsubscribe',
   async (userId, thunkAPI) => {
      try{
         await axios.get(API_URL + 'api/user/unsubscribe/'+ userId, {
            headers: authHeader()
         })
         thunkAPI.dispatch(unsubscribe())
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

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload
      },
      setMessage: (state, action) => {
         state.message = action.payload
      },
      clearMessage: (state) => {
         state.message = ""
      },
      clearUser: () => {
         return { 
            user: null,
            isLoggedIn: false, 
            message: null
         }
      },
      subscribe: (state) => {
         state.user.isFollower = true
         state.user.countFollowers += 1
      },
      unsubscribe: (state) => {
         state.user.isFollower = false
         state.user.countFollowers -= 1
      }
   },
   extraReducers: {
      [getUser.pending]: (state, action) => {
         state.isLoggedIn = false;
         state.user = null;
      },
      [getUser.fulfilled]: (state, action) => {
         state.isLoggedIn = true;
      },
      [getUser.rejected]: (state, action) => {
         console.log("Ошибка")
         state.isLoggedIn = false;
         // state.user = null;
      },
   }
})

export const { setUser, subscribe, unsubscribe } = userSlice.actions;
export default userSlice.reducer


