import React from 'react'
import styles from './IconUser.module.scss'
import userImg from '../../../assets/images/user-icon.webp'

const IconUser = ({img, className, ...props}) => {
   const API_URL = process.env.REACT_APP_API_URL 

   return (
      <img {...props} className={styles.icon+" "+className} src={!!!img?userImg:API_URL+img} alt="User"/>
   );
};
export default IconUser