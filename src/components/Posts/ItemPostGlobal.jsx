import React from 'react'
import styles from './Post.module.scss'
import IconUser from '../UI/IconUser/IconUser';
import {Heart, ChatRight, ShareFill, Bookmark, ThreeDots} from 'react-bootstrap-icons'
import AlertMenu from '../UI/AlertMenu/AlertMenu';
import { useNavigate } from 'react-router-dom';

const ItemPostGlobal = ({post}) => {
   const navigate = useNavigate()

   const redirectLogin = () => {
      navigate("/auth/login")
   }

   return (
      <div className='box'>
         <div className={styles.title_box}> 
            <div className={styles.left_title_box}>
               <IconUser />
               <div className={styles.info}>
                  <p className={styles.title}>{post.userName}</p>
                  <p className={styles.date}>{post.dateTitle}</p>
               </div>
            </div>
            <AlertMenu 
               className={styles.threeDots}
               items={[
                  {
                     onClick: redirectLogin,
                     value: "Пожаловаться"
                  }
               ]} 
            >
               <ThreeDots/>
            </AlertMenu>
         </div>
         <div className='postText' dangerouslySetInnerHTML={{ __html: post.body}} />
         <div className={styles.use_content}>
               <ChatRight onClick={redirectLogin}/>
               <ShareFill onClick={redirectLogin}/>
               {
                  <Bookmark onClick={redirectLogin}/>
               }
               <div className= {styles.box_like}>
                  <Heart onClick={redirectLogin}/>
                  <span>{post.countLike}</span>
               </div>
         </div>
      </div>
   );
};
export default ItemPostGlobal