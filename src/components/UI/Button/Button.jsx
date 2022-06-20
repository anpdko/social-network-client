import React from 'react'
import styles from './Button.module.scss'

const Button = ({children, type, className, ...props}) => {
   if(type === "fill"){
      return (
         <div {...props} 
            className={[styles.btn, styles.btn_fill, className].join(' ')}>
               {children}
         </div>
      )
   }
   else if(type === "fillSubmit"){
      return (
         <button type='submit' {...props} 
            className={[styles.btn, styles.btn_fill, className].join(' ')}>
               {children}
         </button>
      )
   }
   return (
      <div {...props} 
         className={[styles.btn, styles.btn_empty, className].join(' ')}>
         {children}
      </div>
   );
};
export default Button