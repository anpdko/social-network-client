import React, { useState, useEffect } from 'react'
import styles from './SidebarUser.module.scss'
import { HouseDoorFill, GearFill } from 'react-bootstrap-icons'
import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {closeTogleMenu} from '../../store/toggle/toggleSlice'

const SidebarUserGlobal = () => {
   const location = useLocation()
   const dispatch = useDispatch()
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
         title: 'Войти',
         active: false,
         icon: <GearFill className={styles.border_icon}/>,
         link: '/auth/login',
         onClick: ()=>{}
      },
   ])

   const isActive = (id) => {
      dispatch(closeTogleMenu())
      setList(list.map(item=> {
         if(item.id === id){
            return { ...item, active: true }
         }
         return { ...item, active: false }
      }))
   }

   useEffect(()=>{
      list.forEach(item => {
         if(item.link === location.pathname){
            isActive(item.id)
         }
      })
   }, [location.pathname])

   return (
      <div className={toggleMenu?styles.sidebar+ " "+ styles.active:styles.sidebar}>
         <nav className={styles.menu}>
            <ul className={styles.ul}>
               {list.length && list.map((item, index)=>
                  <li 
                     key={index} 
                     className={item.active?styles.active:''}
                     onClick={item.onClick}
                  >
                     <Link to={item.link} className={styles.menu_link} onClick={()=>isActive(item.id)}>
                        {item.icon}
                        {item.title}
                     </Link>
                  </li>
               )}
            </ul>
         </nav>
      </div>
   );
};
export default SidebarUserGlobal