import React, {useState, useEffect} from 'react'
import styles from './IconUser.module.scss'
import userImg from '../../../assets/images/user-icon.webp'

const IMG_URL = process.env.REACT_APP_GOOGLE_DRIVE_IMG_URL

const IconUser = ({img, className, ...props}) => {
   const [imgError, setImgError] = useState(!!!img)
   useEffect(()=>{
      setImgError(!!!img)
      if(img === null){
         setImgError(true)
      }
   }, [img])
   return (
      <img {...props} onError={()=>setImgError(false)} className={styles.icon+" "+className} src={imgError?userImg:(IMG_URL+img)} alt="User"/>
   );
};
export default IconUser