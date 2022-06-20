import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import postSlice from './post/postSlice'
import toggleSlice from './toggle/toggleSlice'
import userSlice from './user/userSlice'
import themeSlice from './theme/themeSlice'
import peopleSlice from './people/peopleSlice'

export default configureStore({
   reducer: {
      auth: authSlice,
      posts: postSlice,
      toggle: toggleSlice,
      user: userSlice,
      theme: themeSlice,
      people: peopleSlice
   },
})
