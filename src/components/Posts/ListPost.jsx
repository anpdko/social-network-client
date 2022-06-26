import React from 'react'
import styles from './Post.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import { useSelector } from 'react-redux'
import ItemPost from './ItemPost';
import ItemPostGlobal from './ItemPostGlobal';

const ListPost = ({posts, page}) => {
   page = page || 1
   const { isLoggedIn } = useSelector((state) => state.auth)
   const { loading, error} = useSelector((state) => state.posts)
   const { user } = useSelector(state => state.auth)

   return (
      <div className={styles.container_posts}>
         {error !== null && error !== " "
            ?<React.Fragment>
               {posts.length
                  ?isLoggedIn
                     ?posts.map(post => 
                        <ItemPost key={post._id} post={post} user={user.userId}/>
                     )
                     :posts.map(post => 
                        <ItemPostGlobal key={post._id} post={post}/>
                     )
                  : !loading && <h2>Список постов пуст</h2>
               }
               {loading && <Loader />}
            </React.Fragment>
            : <h2>Ошибка загрузки данных.</h2>
         }
      </div>
   );
};
export default ListPost