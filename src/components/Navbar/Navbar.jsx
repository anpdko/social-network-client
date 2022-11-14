import React from 'react'
import styles from './Navbar.module.scss' 
import Button from '../UI/Button/Button';
import IconUser from '../UI/IconUser/IconUser'
import { authLogout } from '../../store/auth/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { changeTogleMenu } from '../../store/toggle/toggleSlice';
import Input from '../UI/Input/Input';
import { Search, HouseDoorFill } from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom'
import AlertMenu from '../UI/AlertMenu/AlertMenu';
import Theme from '../Theme/Theme';
import {ReactComponent as Logo} from '../../assets/images/logo.svg'
import {sortedPeople} from '../../store/people/peopleSlice'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
   const user = useSelector((state)=> state.auth.user)
   const {search} = useSelector((state)=> state.people.sorted)
   const navigator = useNavigate()
   const pathname = useLocation().pathname.split('/')[1]
   const path = useLocation().pathname

   const getTextSearch = (text) => {
      if(pathname !== "people" ){
         navigator('/people')
      }
      dispatch(sortedPeople(text))
   }

   return (
      <nav className={styles.nav}>
         <div className= {styles.nav_container}>
            {/* <h3 className={styles.logo}>Logo</h3> */}
            <Logo className={styles.logo_svg}/>
            {isLoggedIn
               ?<div className={styles.nav_left}>
                  <div className={styles.nav_left_main}>
                     <Input 
                        icon={<Search className={styles.icon_input}/>} 
                        placeholder="Поиск"
                        type="text"
                        value = {search}
                        onChange = {(e) => getTextSearch(e.target.value)}
                     />
                     <Theme/>
                     <AlertMenu items={[
                        {
                           onClick: () => navigator('/user/'+user.userId),
                           value: "Мой профиль"
                        },
                        {
                           onClick: () => dispatch(authLogout()),
                           value: "Выйти",
                        }
                     ]} 
                     className={styles.icon_user}
                     >
                        <IconUser img={user?.imgUrlAvatar}/>
                        {/* <IconUser className={styles.toggle}/> */}
                     </AlertMenu>
                  </div>
                  <label className= {styles.menu_btn} onClick={()=>dispatch(changeTogleMenu())}>
                     <span></span>
                  </label>
               </div>
               :<React.Fragment>
                  <Theme/>
                  <div className={styles.nav_left}>
                     {path === '/' 
                        ?<Link to={'/auth/login'}>
                           <Button type="fill"><span>Войти</span></Button>
                        </Link>
                        :<Link to={'/'}>
                           <HouseDoorFill  className={styles.border_icon}/>
                        </Link>
                     }
                  </div>
               </React.Fragment>
            }
         </div>
      </nav>
   );
};
export default Navbar