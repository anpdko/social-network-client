import React, { useState, useEffect  } from "react";
import Button from '../../components/UI/Button/Button';
import styles from './AuthPage.module.scss'
import {Google, Facebook, At, Lock} from 'react-bootstrap-icons'
import Input from '../../components/UI/Input/Input';
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'

import { useDispatch, useSelector } from "react-redux";
import { authLogin, clearMessage } from "../../store/auth/authSlice";
import Loader from "../../components/UI/Loader/Loader";

const AuthPageLogin = () => {
   const {register, handleSubmit, formState: {errors}} = useForm();

   const [loading, setLoading] = useState(false);
   const { message } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const onSubmit = (data) => {
      const { email, password } = data;
      setLoading(true);
      dispatch(authLogin({ email, password }))
         .unwrap()
         .then(() => {
            setLoading(false);
         })
         .catch(() => {
            setLoading(false);
         });
   }

   if(loading){
      return <Loader style={{marginTop: 50}}/>
   }

   return (
      <React.Fragment>
         <h2 className={styles.title}>Вход</h2>
         <h5 className={styles.sub_title}>С возвращением, по тебе скучали!</h5>
         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.group_btn}>
               <Button type="empty">
                  <Google size={18} />
                  Войти через Google
               </Button>
               {/* <Button type="empty">
                  <Facebook size={18} />
                  Войти через Facebook
               </Button> */}
            </div>
            <div className={styles.text_hr}>
               <span></span>
               <h3>ИЛИ</h3>
               <span></span>
            </div>
            <div className={styles.inputs}>
               <Input 
                  icon={<At/>} 
                  placeholder="Ваш Email"
                  type="text"
                  error = {[errors.email, message?.email]}
                  ref = {register("email", {
                     required: "Поле обязательное к заполнению", 
                     pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Некорректно веденный email"
                     },
                     onChange: (e) => {
                        if(message !== ''){
                           dispatch(clearMessage());
                        }
                     },
                  })}
               />
               <Input 
                  icon={<Lock/>}  
                  placeholder="Пароль"
                  type="password"
                  error = {[errors.password, message?.password]}
                  ref = {register("password", {
                     required: "Поле обязательное к заполнению",
                     minLength: {
                        value: 5,
                        message: "Не меньше 5 символов"
                     }
                  })}
               />
            </div>
            <Button type="fillSubmit">Войти</Button>
            <div  className={styles.group_link}>
               <Link className={styles.link} to={"/auth/register"}>У вас еще нет аккаунта?</Link>
               <Link  to={"/auth/register"}>
                  <Button>Создать аккаунт</Button>
               </Link>
            </div>
         </form>
      </React.Fragment>
   );
};
export default AuthPageLogin