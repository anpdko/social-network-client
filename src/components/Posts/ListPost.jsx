import React from 'react'
import styles from './Post.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import { useSelector } from 'react-redux'
import ItemPost from './ItemPost';

const ListPost = ({posts}) => {
   const { loading, error} = useSelector((state) => state.posts)
   const { user } = useSelector(state => state.auth)

   return (
      <div className={styles.container_posts}>
         {loading
            ?<Loader style={{margin: '0 auto'}}/>
            :error
               ?<h2>Ошибка загрузки данных.</h2>
               :posts.map(post => 
                  <ItemPost key={post._id} post={post} user={user.userId}/>
               )
         }
      </div>
   );
};
export default ListPost