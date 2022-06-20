import React from 'react'
import styles from './HeaderUser.module.scss'
import IconUser from '../UI/IconUser/IconUser'
import Button from '../UI/Button/Button'
import {useNavigate, Link} from 'react-router-dom'
import { Images, PeopleFill, PersonCheckFill, PersonPlusFill, PersonXFill, Pencil } from 'react-bootstrap-icons'
import { setSubscribe, setUnsubscribe} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'

const HeaderUser = ({infoUser}) => {
   const navigator = useNavigate()
   const dispatch = useDispatch()
   return (
      <div className= {styles.main + ' box'}>
         <div className={styles.photo_social_name}>
            <div className={styles.photo_social}>
               <IconUser img={infoUser.imgUrlAvatar} style={{width: "8rem", height: "8rem", borderRadius: "1.5rem"}}/>
               <div className={styles.social}>
                  <span><Images/><strong>{infoUser.countPosts}</strong> посты</span>
                  <Link to={'/people/followers/'+infoUser._id}>
                     <span><PeopleFill/><strong>{infoUser.countFollowers}</strong> читатели</span>
                  </Link>
                  <Link to={'/people/following/'+infoUser._id}>
                     <span><PersonCheckFill/><strong>{infoUser.countFollowing}</strong> подписки</span>
                  </Link>
               </div>
            </div>
            <div className={styles.name_button}>
               <h2>{infoUser.name}</h2>
               {infoUser.isFollower !== null
                  ?infoUser.isFollower === true
                     ?<Button onClick={()=>dispatch(setUnsubscribe(infoUser._id))}><PersonXFill/>Отписаться</Button>
                     :<Button onClick={()=>dispatch(setSubscribe(infoUser._id))} type="fill"><PersonPlusFill/>Подписаться</Button>
                  :<Button onClick={()=>navigator("/settings")}><Pencil/>Редактировать</Button>
               }
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod voluptatum distinctio facilis rerum exercitationem assumenda quam impedit nemo velit voluptatem.</p>
         </div>
      </div>
   );
};
export default HeaderUser