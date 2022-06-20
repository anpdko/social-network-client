import React from 'react'
import {Routes, Route } from 'react-router-dom'
import AuthPageLogin from './AuthPageLogin'
import AuthPageRegister from './AuthPageRegister'
import styles from './AuthPage.module.scss'

const AuthPage = () => {
   return (
      <section className={styles.auth_page}>
         <Routes>
            <Route path='/login' element={<AuthPageLogin/>}/>
            <Route path='/register' element={<AuthPageRegister/>}/>
         </Routes>
      </section>
   );
};
export default AuthPage