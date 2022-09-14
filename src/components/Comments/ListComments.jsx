import React, {useEffect, useRef} from 'react'
import styles from './Comments.module.scss'
import IconUser from '../UI/IconUser/IconUser'
import { useSelector } from 'react-redux'

const ListComments = ({comments}) => {
   const { userId } = useSelector(state => state.auth.user)
   const listCommentsRef = useRef(null)

   useEffect(() => {
      console.log(listCommentsRef)
      listCommentsRef.current.scrollTop = listCommentsRef.current.scrollHeight;
   }, [comments])

   return (
      <div className={styles.list_comments} ref={listCommentsRef}>
         {comments.length
            ?comments.map((comment) => 
               comment.userId === userId
                  ?<div key = {comment._id} className={styles.my_user}>
                     <div className={styles.content}>
                        <h4>{comment.name}</h4>
                        <p>{comment.comment}</p>
                     </div>
                     <IconUser/>
                  </div>
                  :<div key = {comment._id} className={styles.all_user}>
                     <IconUser/>
                     <div className={styles.content}>
                        <h4>{comment.name}</h4>
                        <p>{comment.comment}</p>
                     </div>
                  </div>
            )
            :<p>Комментариев еще нет</p>
         }

         <div/>
      </div>
   );
};
export default ListComments