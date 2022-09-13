import React from 'react'
import styles from './Comments.module.scss'
import CreateComments from './CreateComments';
import { motion, AnimatePresence } from 'framer-motion'
import ListComments from './ListComments';

const Comments = ({isVisible, postId, comments}) => {
   const contentVariants = {
      visible: {
         height: "auto",
         opacity: 1
      },
      hidden: { 
         height: 0,
         opacity: 0,
         transition: { duration: 0.1 }
      }
   }

   return (
      <AnimatePresence>
         {isVisible && (
            <motion.div
               initial={'hidden'}
               animate={'visible'}
               exit={'hidden'}
               variants={contentVariants}
            >
               <div className={styles.comments}>
                  <ListComments comments={comments}/>
                  <CreateComments postId={postId}/>
               </div>  
            </motion.div>
         )}
      </AnimatePresence>
   )
};
export default Comments