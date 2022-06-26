import React from "react";
import {Navigate, Routes, Route } from 'react-router-dom'
import AuthPage from "../pages/AuthPage/AuthPage";
import Home from "../pages/Home/Home";
import UserPage from "../pages/UserPage/UserPage"
import SidebarUser from '../components/SidebarUser/SidebarUser';
import Error404 from "../pages/Error/Error404";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import Bookmark from "../pages/Bookmark/Bookmark";
import PeoplePage from "../pages/PeoplePage/PeoplePage"

import SidebarGlobalUser from "../components/SidebarUser/SidebarUserGlobal"
import HomeGlobal from "../pages/Home/HomeGlobal"

const useRouters = (isLogin) => {
   if(isLogin){
      return (
         <section className='main'>
            <SidebarUser/>
            <Routes>
               <Route exact path='/' element={<Home/>}/>
               <Route path='/user/:id' element={<UserPage/>}/>
               <Route path='/settings' element={<SettingsPage/>} />
               <Route path='/bookmark' element={<Bookmark/>}/>
               <Route path='/people' element={<PeoplePage/>}/>
               <Route path='/people/followers/:id' element={<PeoplePage/>}/>
               <Route path='/people/following/:id' element={<PeoplePage/>}/>
               <Route path="/auth/login" element={<Navigate to={'/'}/>} />
               <Route path="/auth/register" element={<Navigate to={'/'}/>} />
               <Route path='/error' element={<Error404/>}/>
               <Route path="*" element={<Navigate to={'error'}/>} />
            </Routes>
         </section>
      )
   }
   return (
      <Routes>
         <Route exact path='/' element={ 
            <section className='main'>
               <SidebarGlobalUser/>
               <HomeGlobal/>
            </section>
         }/>
         <Route path='/auth/*' element={<AuthPage/>}/>
         <Route path="*" element={<Navigate to={'/auth/login'}/>} />
      </Routes>
   )
};
export default useRouters