import React, {useState, useEffect} from 'react'
import styles from './Navbar.module.scss'
import Button from '../UI/Button/Button';
import IconUser from '../UI/IconUser/IconUser'
import { authLogout } from '../../store/auth/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { changeTogleMenu } from '../../store/toggle/toggleSlice';
import Input from '../UI/Input/Input';
import { Search } from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom'
import AlertMenu from '../UI/AlertMenu/AlertMenu';
import Theme from '../Theme/Theme';
import {ReactComponent as Logo} from '../../assets/images/logo.svg'

const Navbar = () => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
   const user = useSelector((state)=> state.auth.user)
   const [textSearch, setTextSearch] = useState('')
   const navigator = useNavigate()

   useEffect(()=>{
      console.log(textSearch)
   }, [textSearch])

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
                        value = {textSearch}
                        onChange = {(e) => setTextSearch(e.target.value)}
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
                     <Link to={'/auth/login'}>
                        <Button type="fill"><span>Войти</span></Button>
                     </Link>
                  </div>
               </React.Fragment>
            }
         </div>
      </nav>
   );
};
export default Navbar