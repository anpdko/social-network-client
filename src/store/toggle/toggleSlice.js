import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   toggleMenu: false
}

const toggleSlice = createSlice({
   name: 'toogle',
   initialState,
   reducers: {
      changeTogleMenu: (state) => {
         state.toggleMenu = !state.toggleMenu
      },
      closeTogleMenu: (state) => {
         state.toggleMenu = false
      }
   }
})

export const { changeTogleMenu, closeTogleMenu } = toggleSlice.actions
export default toggleSlice.reducer