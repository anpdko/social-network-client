import React from 'react'
import {TextCenter, TextRight, TextLeft, TypeItalic, TypeBold, TypeH1, TypeH2, TypeH3, Type, Code, Justify, Image, FileEarmarkImage} from 'react-bootstrap-icons'
import axios from 'axios';
import authHeader from '../../services/Auth/header'

const API_URL = process.env.REACT_APP_API_URL 

const MenuBar = ({ editor }) => {

   if (!editor) {
      return null
   }

   const addImage = () => {
    const url = window.prompt('Вставте URL картинки:')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const uploadImage = async (event) => {
    var img = event.target.files[0];
    if(!!img){
      try{
          const data = new FormData()
          data.append('img', img)
          await axios.post(API_URL + 'api/posts/upload', data, {
            headers: {
                'content-type': 'mulpipart/form-data',
                ...authHeader()
            }
          })
          .then(res => {
            const url = API_URL + 'static/images/' + res.data.filename
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          })
      }catch(err) {
          console.log(err)
          alert("Ошибка загрузки картинки на сервер, попробуйте позже!")
      }
    }
  }

   return (
     <React.Fragment>
       <ul style={{gridColumnStart: "span 4"}}>
          <li onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
            <TypeH1/>
          </li>
          <li onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
            <TypeH2/>
          </li>
          <li onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
            <TypeH3/>
          </li>
          <li onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
            <Type/>
          </li>
          </ul>
        <ul style={{gridColumnStart: "span 2"}}>
          <li onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
            <TypeBold/>
          </li>
          <li onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
            <TypeItalic/>
          </li>
          </ul>
        <ul style={{gridColumnStart: "span 4"}}>
          <li onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
            <TextLeft/>
          </li>
          <li onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
            <TextCenter/>
          </li>
          <li onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
            <TextRight/>
          </li>
          <li onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
            <Justify/>
          </li>
        </ul>
        <ul style={{gridColumnStart: "span 2"}}>
          <li onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
            <Code/>
          </li>
          <li onClick={addImage}><Image/></li>
          <li style={{position: "relative",}}><FileEarmarkImage/><input 
              onChange={uploadImage}
              type="file"
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                background: "red"
                
              }}
          /></li>
        </ul>
     </React.Fragment>
   );
};
export default MenuBar