import React, { useState, useEffect, useCallback } from 'react'
import styles from './SidebarUser.module.scss'
import { PersonFill, HouseDoorFill, GearFill, ArrowRightCircleFill, BookmarkFill, PeopleFill } from 'react-bootstrap-icons'
import {NavLink, useLocation} from 'react-router-dom'
import {authLogout} from '../../store/auth/authSlice'
import IconUser from '../UI/IconUser/IconUser'
import { useSelector, useDispatch } from 'react-redux'
import {changeTogleMenu, closeTogleMenu} from '../../store/toggle/toggleSlice'

const SidebarUser = () => {
   const location = useLocation().pathname.split('/')[1]
   const dispatch = useDispatch();
   const user = useSelector((state)=> state.auth.user)
   const toggleMenu = useSelector((state)=> state.toggle.toggleMenu)
   const [ list, setList ] = useState([
      {
         id: 1, 
         title: 'Новости',
         active: false,
         icon: <HouseDoorFill className={styles.border_icon}/>,
         link: '/',
         onClick: ()=>{}
      },
      {
         id: 2, 
         title: 'Мои записи',
         active: false,
         icon: <PersonFill className={styles.border_icon}/>,
         link: '/user/' + user.userId,
         onClick: ()=>{}
      },
      {
         id: 3,
         title: 'Люди',
         active: false,
         icon: <PeopleFill className={styles.border_icon}/>,
         link: '/people',
         onClick: ()=>{}
      },
      {
         id: 4, 
         title: 'Избранное',
         active: false,
         icon: <BookmarkFill className={styles.border_icon}/>,
         link: '/bookmark',
         onClick: ()=>{}
      },
      {
         id: 5, 
         title: 'Настройки',
         active: false,
         icon: <GearFill className={styles.border_icon}/>,
         link: '/settings',
         onClick: ()=>{}
      }
   ])

   const isActive = useCallback((id) => {
      dispatch(closeTogleMenu())
      setList(list.map(item=> {
         if(item.id === id){
            return { ...item, active: true }
         }
         return { ...item, active: false }
      }))
   }, [dispatch, list])

   useEffect(()=>{
      list.forEach(item => {
         if(item.link === "/" + location){
            isActive(item.id)
         }
      })
   }, [isActive, list, location])

   return (
      <div className={toggleMenu?styles.sidebar+ " "+ styles.active:styles.sidebar}>
         <div className={styles.user_block}>
            <NavLink to={"/user" + user.userId} onClick={()=>isActive(2)}>
               <IconUser img={user.imgUrlAvatar}/>
               <p>{user.name?user.name:"Неизвестный"}</p>
            </NavLink>
            <label className= {toggleMenu?styles.menu_btn+" "+styles.active:styles.menu_btn } onClick={()=>dispatch(changeTogleMenu())}>
               <span></span>
            </label>
         </div>
         <nav className={styles.menu}>
            <ul className={styles.ul}>
               {list.length && list.map((item, index)=>
                  <li 
                     key={index} 
                     className={item.active?styles.active:''}
                     onClick={item.onClick}
                  >
                     <NavLink to={item.link} className={styles.menu_link} onClick={()=>isActive(item.id)}>
                        {item.icon}
                        {item.title}
                     </NavLink>
                  </li>
               )}
               <li onClick={() => dispatch(authLogout())}>
                  <span className={styles.menu_link}>
                     <ArrowRightCircleFill className={styles.border_icon}/>
                     Выйти
                  </span>
               </li>
            </ul>
         </nav>
      </div>
   );
};
export default SidebarUser