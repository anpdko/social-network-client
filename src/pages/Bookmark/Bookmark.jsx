import React, { useEffect } from 'react'
import ListPost from '../../components/Posts/ListPost';
import {useDispatch, useSelector } from 'react-redux'
import {getBookmarkPosts} from '../../store/post/postSlice'

const Bookmark = () => {
   const dispatch = useDispatch()
   const { posts } = useSelector((state) => state.posts)
   
   useEffect(()=>{
      dispatch(getBookmarkPosts())
   }, [dispatch])

   return (
      <main className="contant">
         {posts.length
            ?<ListPost posts={posts}/>
            :<h2>У Вас нет избраных постов</h2>
         }
      </main>
   );
};
export default Bookmark