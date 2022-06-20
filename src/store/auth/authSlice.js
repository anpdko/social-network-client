import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/Auth/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
? { 
   user,
   isLoggedIn: true, 
   message: null
}
: { 
   user: null,
   isLoggedIn: false, 
   message: null
};

export const authRegister = createAsyncThunk(
   "auth/authRegister",
   async ({ email, name, password }, thunkAPI) => {
      try {
         const response = await AuthService.register(email, name, password);
         thunkAPI.dispatch(setMessage(response.data.message));
         return response.data;
      } 
      catch (error) {
         const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
         thunkAPI.dispatch(setMessage(message));
         return thunkAPI.rejectWithValue();
     }
   }
 );

export const authLogin = createAsyncThunk(
   "auth/authLogin",
   async ({ email, password }, thunkAPI) => {
      try {
         const data = await AuthService.login(email, password);
         return { user: data };
      } 
      catch (error) {
         const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
         thunkAPI.dispatch(setMessage(message));
         return thunkAPI.rejectWithValue();
     }
   }
 );

export const authLogout = createAsyncThunk(
   "auth/authLogout", 
   async (_, thunkAPI) => {
      await AuthService.logout();
      thunkAPI.dispatch(clearUser());
      return thunkAPI.rejectWithValue();
   }
);

export const authChangeImgUrlAvater = createAsyncThunk(
   "auth/authChangeImgUrlAvater",
   async(imgUrlAvater, thunkAPI) => {
      await AuthService.changeLocalStorageAvatar(imgUrlAvater)
      thunkAPI.dispatch(changeImgUrlAvatar(imgUrlAvater))
      return thunkAPI.rejectWithValue();
   }
) 


 const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setMessage: (state, action) => {
         state.message = action.payload
      },
      clearMessage: (state) => {
         state.message = ""
      },
      changeImgUrlAvatar: (state, action) => {
         state.user.imgUrlAvatar = action.payload
      },
      clearUser: ()=>{
         return { 
            user: null,
            isLoggedIn: false, 
            message: null
         }
      }
   },
   extraReducers: {
      [authRegister.pending]: (state, action) => {
         state.isLoggedIn = false;
         state.message = null;
      },
      [authRegister.fulfilled]: (state, action) => {
         state.isLoggedIn = false;
      },
      [authRegister.rejected]: (state, action) => {
         state.isLoggedIn = false;
      },
      [authLogin.pending]: (state, action) => {
         state.isLoggedIn = false;
         state.user = null;
         state.message = null;
      },
      [authLogin.fulfilled]: (state, action) => {
         state.isLoggedIn = true;
         state.user = action.payload.user;
      },
      [authLogin.rejected]: (state, action) => {
         state.isLoggedIn = false;
         state.user = null;
      },
   },
 });


 export const { setMessage, clearMessage, clearUser, changeImgUrlAvatar } = authSlice.actions

 const { reducer } = authSlice;
 export default reducer;

