import React, { useState, useEffect } from 'react'
import ListPost from '../../components/Posts/ListPost';
import { getGlobalPosts, } from '../../store/post/postSlice';
import {useDispatch, useSelector } from 'react-redux'
import usePageBottom from '../../hooks/usePageBottom'

const HomeGlobal = () => {
   const isBottom = usePageBottom();
   const [page, setPage] = useState(1)

   const dispatch = useDispatch()
   const { posts, loading } = useSelector((state) => state.posts)

   useEffect(()=>{
      if ((isBottom || page === 1) && !loading) {
         dispatch(getGlobalPosts({page: page}))
         setPage(page+1)
      }
   }, [loading, page, dispatch, isBottom])

   return (
      <main className="contant">
         <ListPost posts={posts} page={page}/>
      </main>
   );
};
export default HomeGlobal