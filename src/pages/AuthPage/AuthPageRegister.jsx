import React, {useEffect, useState} from 'react'
import Button from '../../components/UI/Button/Button';
import styles from './AuthPage.module.scss'
import {Google, Facebook, At, EmojiSmile, Lock} from 'react-bootstrap-icons'
import Input from '../../components/UI/Input/Input';
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { authRegister, clearMessage } from '../../store/auth/authSlice'
import Loader from '../../components/UI/Loader/Loader'
import { useNavigate } from "react-router-dom";
 
const AuthPageRegister = () => {
   const dispatch = useDispatch();
   const {register, handleSubmit, watch, formState: {errors}} = useForm();
   const [loading, setLoading] = useState(false);   //?
   const {message } = useSelector((state) => state.auth);
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(clearMessage());
   }, [dispatch]);

   const onSubmit = (data) => {
      setLoading(true);
      const { email, name, password } = data;
      dispatch(authRegister({ email, name, password }))
      .unwrap()
      .then(() => {
         navigate('/auth/login')
         setLoading(false);
      })
      .catch(() => {
         setLoading(false);
      });
   }

   if(loading === true){
      return <Loader/>
   }

   return (
      <React.Fragment>
         <h2 className={styles.title}>Начало работы!</h2>
         <h5 className={styles.sub_title}>Создайте учетную запись, чтобы продолжить и общаться с людьми.</h5>
         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.group_btn}>
               <Button type="empty">
                  <Google size={18} />
                  Войти через Google
               </Button>
               <Button type="empty">
                  <Facebook size={18} />
                  Войти через Facebook
               </Button>
            </div>
            <div className={styles.text_hr}>
               <span></span>
               <h3>ИЛИ</h3>
               <span></span>
            </div>
            <div className={styles.inputs}>
               <Input 
                  icon={<At/>} 
                  error = {[errors.email, message?.email]}
                  placeholder="Ваш Email"
                  type="text"
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
                  icon={<EmojiSmile/>}  
                  placeholder="Ваш Login"
                  error = {errors.name}
                  type="name"
                  ref = {register("name", {
                     required: "Поле обязательное к заполнению",
                     pattern: {
                        value: /[A-Za-z]/,
                        message: "Имя должно содержать только латинсике буквы"
                     },
                     maxLength: {
                        value: 20,
                        message: "Не больше 20 букв"
                     }

                  })}
               />
               <Input 
                  icon={<Lock/>}  
                  placeholder="Придумайте пароль"
                  error = {errors.password}
                  type="password"
                  ref = {register("password", {
                     required: "Поле обязательное к заполнению",
                     minLength: {
                        value: 6,
                        message: "Не меньше 6 символов"
                     }
                  })}
               />
               <Input 
                  icon={<Lock/>}  
                  placeholder="Повторите пароль"
                  type="password"
                  error = {errors.repetPassword}
                  ref = {register("repetPassword", {
                     validate: (val) => {
                        if (watch('password') !== val) {
                           return "Пароли не совпадают";
                        }
                     }
                  })}
               />
            </div>
            <Button type="fillSubmit">Зарегистрироваться</Button>

            <Link className={styles.link} to={"/auth/login"}>У вас уже есть аккаунт?</Link>
         </form>
      </React.Fragment>
   );
};
export default AuthPageRegister