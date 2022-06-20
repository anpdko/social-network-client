import React from 'react';
import styles from './Loader.module.scss'

const Loader = ({style}) => {
   return (
      <div style={style} className={styles.loader}>Loading...</div>
   );
};

export default Loader;