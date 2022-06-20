import React, { useEffect } from 'react'
import CreatePost from '../../components/CreatePost/CreatePost';
import { useDispatch, useSelector } from 'react-redux'
import ListPost from '../../components/Posts/ListPost';
import { getPostsUser } from '../../store/post/postSlice';
import HeaderUser from '../../components/HearedUser/HeaderUser'
import { getUser } from '../../store/user/userSlice'
import { useParams } from 'react-router-dom'
import Error404 from '../Error/Error404';


const MyPage = () => {
   const dispatch = useDispatch()
   const { posts } = useSelector((state) => state.posts)
   const { userId } = useSelector((state)=> state.auth.user)
   const youUserId = useParams().id
   const infoUser = useSelector((state) => state.user.user)

   useEffect(()=>{
      if(youUserId){
         dispatch(getUser(youUserId))
         dispatch(getPostsUser(youUserId))
      }
      else{
         dispatch(getUser(userId))
         dispatch(getPostsUser(userId))
      }
   }, [dispatch, userId, youUserId])

   return (
      <main className="contant">
         {infoUser &&infoUser
            ?<React.Fragment>
               <HeaderUser infoUser = {infoUser}/>
               {!!!youUserId && <CreatePost/>}
               <ListPost posts = {posts}/>
            </React.Fragment>
            :<Error404/>
         }
      </main>
   );
};

export default MyPage;