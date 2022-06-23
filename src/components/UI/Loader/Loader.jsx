import React from 'react';
import styles from './Loader.module.scss'

const Loader = ({style, back}) => {
   if(!back){
      return (
         <div style={style} className={styles.loader}>Loading...</div>
      );
   }
   return (
      <div className={styles.back_loader}>
         <div style={style} className={styles.loader}>Loading...</div>
      </div>
   );
};

export default Loader;