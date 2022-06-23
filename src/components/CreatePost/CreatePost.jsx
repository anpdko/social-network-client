import React, {useRef, useEffect, useState} from 'react'
import {Link45deg} from 'react-bootstrap-icons'
import styles from './CreatePost.module.scss'
import IconUser from '../UI/IconUser/IconUser'

// import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import {lowlight} from 'lowlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockComponent from './CodeBlock/CodeBlock'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BoldOptions from '@tiptap/extension-bold';
import ItalicOptions from '@tiptap/extension-italic';
import HorizontalRuleOptions from '@tiptap/extension-horizontal-rule';
import StrikeOptions from '@tiptap/extension-strike';
import HeadingOptions from '@tiptap/extension-heading';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import MenuBar from './MenuBar';
import Button from '../UI/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../store/post/postSlice';

const CreatePost = () => {
   const user = useSelector((state)=> state.auth.user)
   const dispatch = useDispatch()


   const textareaElement = useRef(null);
   const [activeTextarea, serActiveTextarea] = useState(false)
   const editor = useEditor({
      extensions: [
         BoldOptions, ItalicOptions,
         HorizontalRuleOptions,
         StrikeOptions, HeadingOptions,
         Document, Paragraph,
         Text, Image, Dropcursor,
         CodeBlockLowlight.extend({
            addNodeView() {
               return ReactNodeViewRenderer(CodeBlockComponent)
            },
         }).configure({ lowlight }),
         Placeholder.configure({
            placeholder: 'Напиши пост …'
         }),
         TextAlign.configure({
           types: ['heading', 'paragraph'],
         }),
      ],
      editable: true,
      content: ''
   })

   const onCreate = () => {
      const content = editor.getHTML()
      if(content !== "<p></p>"){
         dispatch(createPost({
            body: editor.getHTML(),
            userId: user.userId
         }))
      }
      editor.commands.clearContent()
   }

   // // Проверка нажатия на элемент
   useEffect(() => {
      const onClick = (e) => {
         textareaElement.current.contains(e.target)?serActiveTextarea(true):serActiveTextarea(false)
      }
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
   }, []);

   return (
      <div className='box'>
         <div className= {styles.textarea} translate="no" ref={textareaElement}>
            <div className={styles.editor_container}>
               <IconUser img={user.imgUrlAvatar}/>
               <EditorContent className={activeTextarea?styles.editor+" "+ styles.active:styles.editor} editor={editor}/>
            </div>
            <div className={activeTextarea?styles.btn_group+" "+styles.show:styles.btn_group +" "+ styles.hide}>
               <div className={styles.btn_editor}>
                  <MenuBar editor={editor} />
               </div>
               <Button style={{flex: "1 0 auto", boxSizing: "border-box"}} type="fill" onClick={onCreate}><Link45deg/>Добавить</Button>
            </div>
         </div>
      </div>
   );
};
export default CreatePost