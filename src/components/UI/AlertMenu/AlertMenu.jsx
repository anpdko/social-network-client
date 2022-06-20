import React from 'react'
import styles from './AlertMenu.module.scss'

const AlertMenu = ({items, children, className, ...props}) => {
   return (
      <div {...props} className={className + " " + styles.alertMenu}>
         {children}
         <ul {...props} className={styles.menu}  tabIndex="0">
            {items.map((item, index)=>
               <li key={index} onClick={item.onClick}>{item.value}</li>
            )}
         </ul>
      </div>
   );
};
export default AlertMenu