import React, {useState} from 'react'
import styles from './Post.module.scss'
import IconUser from '../UI/IconUser/IconUser';
import {Heart, HeartFill, ChatRight, ShareFill, Bookmark, BookmarkFill, ThreeDots} from 'react-bootstrap-icons'
import AlertMenu from '../UI/AlertMenu/AlertMenu';
import {delayPost, getBookmark, getLike} from '../../store/post/postSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';

const ItemPost = ({post, user}) => {
   const dispatch = useDispatch()
   const [isVisible, setVisible] = useState(false)
   const handleVisibility = () => setVisible(!isVisible)

   return (
      <div className='box'>
         <div className={styles.title_box}> 
            <Link 
               className={styles.left_title_box} 
               to={'/user/' + post.userId}>
               <IconUser img={post.imgUrlAvatar}/>
                  <div className={styles.info}>
                     <p className={styles.title}>{post.userName}</p>
                     <p className={styles.date}>{post.dateTitle}</p>
                  </div>
            </Link>
            <AlertMenu 
               className={styles.threeDots}
               items={user === post.userId
               ?[
                  {
                     onClick: () => dispatch(delayPost(post._id)),
                     value: "Удалить пост"
                  },
                  {
                     onClick: () => console.log("Жалоба на пост"),
                     value: "Пожаловаться"
                  }
               ]
               :[
                  {
                     onClick: () => console.log("Жалоба на пост"),
                     value: "Пожаловаться"
                  }
               ]
            } 
            >
               <ThreeDots/>
            </AlertMenu>
         </div>
         <div className='postText' dangerouslySetInnerHTML={{ __html: post.body}}/>
         <div className={styles.use_content}>
               <div className= {styles.box_like}>
                  <ChatRight onClick={handleVisibility}/>
                  <span style={{marginLeft: 2}}>{post.commentsCount}</span>
               </div>
               <ShareFill/>
               {post.isBookmark
                  ?<BookmarkFill onClick={()=>dispatch(getBookmark(post._id))}/>
                  :<Bookmark onClick={()=>dispatch(getBookmark(post._id))}/>
               }
               <div className= {styles.box_like}>
                  {post.like
                     ?<HeartFill className={styles.like} onClick={()=>dispatch(getLike(post._id))}/>
                     :<Heart onClick={()=>dispatch(getLike(post._id))}/>
                  }
                  <span>{post.countLike}</span>
               </div>
         </div>
            <Comments isVisible={isVisible} postId={post._id} comments={post.comments}/>
      </div>
   );
};
export default ItemPost