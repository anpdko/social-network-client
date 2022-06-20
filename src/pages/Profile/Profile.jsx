import React from 'react'
import CreatePost from '../../components/CreatePost/CreatePost';
// import styles from './Profile.module.scss'
import {useDispatch, useSelector } from 'react-redux'
import ListPost from '../../components/Posts/ListPost';
import { createPost } from '../../store/post/postSlice';

const Profile = () => {
   const dispatch = useDispatch()
   const userId = useSelector((state)=> state.auth.user.userId)

   const onCreate = (data) => {
      dispatch(createPost({
         body: data,
         userId: userId
      }))
   }

   return (
      <main className="contant">
         <div className='box'>
            <CreatePost onCreate = {onCreate}/>
         </div>
         <ListPost />
      </main>
   );
};
export default Profile