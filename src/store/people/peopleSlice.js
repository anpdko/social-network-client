import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import authHeader from '../../services/Auth/header'
import authService from '../../services/Auth/auth.service'
import { authLogout } from '../auth/authSlice'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
   people: [],
   loading: null,
   error: null
}

export const getPeople = createAsyncThunk(
   'people/getPeople',
   async (_, thunkAPI) => {
      try { 
         const res = await axios.get(API_URL + 'api/people/all', {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error("Server error");
         }
         thunkAPI.dispatch(setPeople(res.data))
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

export const getPeopleFollowers = createAsyncThunk(
   'people/getPeopleFollowers',
   async (userId, thunkAPI) => {
      try { 
         const res = await axios.get(API_URL + 'api/people/followers/' + userId, {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error("Server error");
         }
         thunkAPI.dispatch(setPeople(res.data))
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

export const getPeopleFollowing = createAsyncThunk(
   'people/getPeopleFollowing',
   async (userId, thunkAPI) => {
      try { 
         const res = await axios.get(API_URL + 'api/people/following/' + userId, {
            headers: authHeader()
         })
         if(res.statusText !== 'OK'){
            throw new Error("Server error");
         }
         thunkAPI.dispatch(setPeople(res.data))
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
export const setSubscribePeople = createAsyncThunk(
   'post/setSubscribePeople',
   async (userId, thunkAPI) => {
      try{
         await axios.get(API_URL + 'api/user/subscribe/'+ userId, {
            headers: authHeader()
         })
         thunkAPI.dispatch(subscribe(userId))
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
export const setUnsubscribePeople = createAsyncThunk(
   'post/setUnsubscribePeople',
   async (userId, thunkAPI) => {
      try{
         await axios.get(API_URL + 'api/user/unsubscribe/'+ userId, {
            headers: authHeader()
         })
         thunkAPI.dispatch(unsubscribe(userId))
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

export const peopleSlice = createSlice({
   name: 'people',
   initialState,
   reducers: {
      setPeople: (state, action) => {
         state.people = action.payload
      },
      subscribe: (state, action) => {
         state.people = state.people.map(user => {
            if(user._id === action.payload){
               return {...user, isFollower: true, countFollowers: user.countFollowers+1}
            }
            return user
         })
      },
      unsubscribe: (state, action) => {
         state.people = state.people.map(user => {
            if(user._id === action.payload){
               return {...user, isFollower: false, countFollowers: user.countFollowers-1}
            }
            return user
         })
      }
   },
   extraReducers: {
      [getPeople.pending]: (state) => {
         state.loading = true
         state.error = ''
      },
      [getPeople.fulfilled]: (state) => {
         state.loading = false
      },
      [getPeople.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload
      }
   
   }
})

export const {setPeople, subscribe, unsubscribe} = peopleSlice.actions

export default peopleSlice.reducer