import React, { useState, useEffect } from 'react'
import CreatePost from '../../components/CreatePost/CreatePost';
import { useDispatch, useSelector } from 'react-redux'
import ListPost from '../../components/Posts/ListPost';
import { getPostsUser } from '../../store/post/postSlice';
import HeaderUser from '../../components/HearedUser/HeaderUser'
import { getUser } from '../../store/user/userSlice'
import { useParams } from 'react-router-dom'
import usePageBottom from '../../hooks/usePageBottom'
import Loader from '../../components/UI/Loader/Loader'


const MyPage = () => {
   const isBottom = usePageBottom();
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { userId } = useSelector((state) => state.auth.user) 
   const { posts, loading } = useSelector((state) => state.posts)
   const youUserId = useParams().id
   const infoUser = useSelector((state) => state.user.user)

   //Загрузка данных для карточки заголовка User
   useEffect(()=>{
      dispatch(getUser(youUserId))
   }, [dispatch, youUserId])

   useEffect(()=>{
      dispatch(getPostsUser({userId: youUserId, page: 1}))
      setPage(2)
   }, [dispatch, youUserId])

   useEffect(()=>{
      if (isBottom && !loading) {
         dispatch(getPostsUser({userId: youUserId, page: page}))
         setPage(page+1)
      }
   }, [dispatch, loading, page, youUserId, isBottom])

   return (
      <main className="contant">
         {infoUser
            ?<React.Fragment>
               <HeaderUser infoUser = {infoUser}/>
               {youUserId === userId && <CreatePost/>}
               <ListPost posts = {posts} page={page}/>
            </React.Fragment>
            :<Loader />
         }
      </main>
   );
};

export default MyPage;