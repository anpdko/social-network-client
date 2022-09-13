import React, {useState} from 'react'
import IconUser from '../UI/IconUser/IconUser';
import Input from '../UI/Input/Input'
import styles from './Comments.module.scss'
import Button from '../UI/Button/Button'
import {createCommentPost} from '../../store/post/postSlice'
import { useDispatch } from 'react-redux';
import { 
   ArrowRightSquareFill
} from 'react-bootstrap-icons'

const CreateComments = ({postId}) => {
   const [commentData, setCommentData] = useState("")
   const dispatch = useDispatch()

   const onCreateComment = () => {
      if(commentData !== ""){
         const data = {
            comment: commentData,
            postId: postId
         }
         dispatch(createCommentPost(data))
      }
      setCommentData("")
   }


   return (
      <div className={styles.create_comments}>
         <IconUser/>
         <Input 
            placeholder="Написать коментарий..."
            onChange={(e)=>setCommentData(e.target.value)}
            value={commentData}
            style={{
               padding: "8px 15px"
            }}
         />
         <Button 
            type="fill" 
            onClick={onCreateComment}
            style={{
            padding: 7
         }}>
            <ArrowRightSquareFill color='white'/>
         </Button>
      </div>
   );
};
export default CreateComments