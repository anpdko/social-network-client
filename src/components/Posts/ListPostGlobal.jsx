import React, { useEffect }  from 'react'
import styles from './Post.module.scss'
import { getGlobalPosts, } from '../../store/post/postSlice';
import Loader from '../UI/Loader/Loader'
import {useDispatch, useSelector } from 'react-redux'
import ItemPostGlobal from './ItemPostGlobal';

const ListPostGlobal = () => {
   const dispatch = useDispatch()
   const { posts, loading, error} = useSelector((state) => state.posts)

   useEffect(()=>{
      dispatch(getGlobalPosts())
   }, [dispatch])

   return (
      <div className={styles.container_posts}>
         {loading
            ?<Loader style={{margin: '0 auto'}}/>
            :error
               ?<h2>Ошибка загрузки данных.</h2>
               :posts.map(post => 
                  <ItemPostGlobal key={post._id} post={post}/>
               )
         }
      </div>
   );
};
export default ListPostGlobal