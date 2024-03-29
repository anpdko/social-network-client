import React, { useState, useEffect, useCallback } from 'react'
import styles from './SidebarUser.module.scss'
import { HouseDoorFill, GearFill } from 'react-bootstrap-icons'
import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {closeTogleMenu} from '../../store/toggle/toggleSlice'

const SidebarUserGlobal = () => {
   const location = useLocation().pathname.split('/')[1]
   const dispatch = useDispatch()
   const [active, setActive] = useState(0)
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

   const isActive = useCallback(() => {
      dispatch(closeTogleMenu())
      setList(l => l.map(item=> {
         if(item.id === active || item.link === "/" + location){
            return { ...item, active: true }
         }
         return { ...item, active: false }
      }))
   }, [dispatch, location, active])

   useEffect(()=>{
      isActive()
   }, [isActive])

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
                     <Link to={item.link} className={styles.menu_link} onClick={()=>setActive(item.id)}>
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