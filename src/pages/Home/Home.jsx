import React, { useEffect, useState } from 'react'
import ListPost from '../../components/Posts/ListPost';
import {useDispatch, useSelector } from 'react-redux'
import {getPosts, getPostsFollowing} from '../../store/post/postSlice'
import CreatePost from '../../components/CreatePost/CreatePost'
import Select from 'react-select'
import '../../assets/scss/react-select.scss'

const Home = () => {
   const dispatch = useDispatch()
   const { posts } = useSelector((state) => state.posts)
   const options = [
      { value: '1', label: 'Все новости' },
      { value: '2', label: 'Новости для меня' },
   ]
   const [sorted, setSorted] = useState(options[0])
   
   useEffect(()=>{
      dispatch(getPosts())
   }, [dispatch])

   const changeSelect = (e) => {
      if(sorted.value !== e.value){
         setSorted(e)
         if(e.value === "1"){
            dispatch(getPosts())
         }
         else if(e.value === "2"){
            dispatch(getPostsFollowing())
         }
      }
   } 

   return (
      <main className="contant">
         <CreatePost/>
         <div className='box' style={{padding: 0}}>
            <Select 
               onChange={changeSelect} 
               value={sorted} 
               options={options}
               classNamePrefix = 'custom-select'
               isLoading={false}
               theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: '',
                    primary: '#1877f2',
                  },
                })}
            />
         </div>
         {posts.length 
            ?<ListPost posts={posts}/>
            :<h2>Посты не найдены</h2>
         }
      </main>
   );
};
export default Home