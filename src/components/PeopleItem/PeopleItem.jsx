import React from 'react'
import styles from './PeopleItem.module.scss'
import IconUser from '../UI/IconUser/IconUser'
import cn from 'classnames'
import {PeopleFill, PersonXFill, PersonPlusFill} from 'react-bootstrap-icons'
import {Link} from 'react-router-dom'
import Button from '..//UI/Button/Button'
import { setSubscribePeople, setUnsubscribePeople } from '../../store/people/peopleSlice'
import { useDispatch } from 'react-redux'

const PeopleItem = ({infoUser}) => {
   const dispatch = useDispatch()
   return (
      <div className= {cn(styles.people_item,'box')}>
         <Link className={styles.user} to={'/user/'+ infoUser._id}>
            <IconUser  img={infoUser.imgUrlAvatar} style={{width: "4rem", height: "4rem", borderRadius: "1.1rem"}}/>
            <div className={styles.info_user}>
               <h3>{infoUser.name}</h3>
               <span><PeopleFill/><strong>{infoUser.countFollowers}</strong> читателей</span>
            </div>
         </Link>
         {infoUser.isFollower !== null
            ?infoUser.isFollower
               ?<Button 
                  onClick={()=>dispatch(setUnsubscribePeople(infoUser._id))}
               >
                  <PersonXFill/>
                  <span className={styles.text_btn}>Отписаться</span>
               </Button>
               :<Button 
                  type="fill" 
                  onClick={()=>dispatch(setSubscribePeople(infoUser._id))}
               >
                  <PersonPlusFill/> 
                  <span className={styles.text_btn}>Подписаться</span>
               </Button>
            :<p>Ваш профиль</p>
         }
      </div>
   );
};
export default PeopleItem