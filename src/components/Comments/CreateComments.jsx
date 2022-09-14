import React, {useState} from 'react'
import IconUser from '../UI/IconUser/IconUser';
import Input from '../UI/Input/Input'
import styles from './Comments.module.scss'
import Button from '../UI/Button/Button'
import {createCommentPost} from '../../store/post/postSlice'
import { useDispatch, useSelector } from 'react-redux';
import { 
   ArrowRightSquareFill
} from 'react-bootstrap-icons'

const CreateComments = ({postId}) => {
   const [commentData, setCommentData] = useState("")
   const user = useSelector((state)=> state.auth.user)
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

   
   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         onCreateComment()
      }
    };


   return (
      <div className={styles.create_comments}>
         <IconUser img={user.imgUrlAvatar}/>
         <Input 
            onKeyPress={handleKeyPress}
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