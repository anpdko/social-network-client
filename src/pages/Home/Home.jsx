import React, { useEffect, useState } from 'react'
import ListPost from '../../components/Posts/ListPost';
import {useDispatch, useSelector } from 'react-redux'
import {getPosts, getPostsFollowing} from '../../store/post/postSlice'
import CreatePost from '../../components/CreatePost/CreatePost'
import Select from 'react-select'
import '../../assets/scss/react-select.scss'
import usePageBottom from '../../hooks/usePageBottom'

const Home = () => {
   const dispatch = useDispatch()
   const { posts, loading } = useSelector((state) => state.posts)
   const isBottom = usePageBottom();
   const [page, setPage] = useState(1)
   const options = [
      { value: '1', label: 'Все новости' },
      { value: '2', label: 'Новости для меня' },
   ]
   const [sorted, setSorted] = useState(options[0])
   
   useEffect(()=>{
      if ((isBottom || page === 1) && !loading) {
         dispatch(getPosts({page: page}))
         setPage(page+1)
      }
   }, [dispatch, isBottom])

   const changeSelect = (e) => {
      if(sorted.value !== e.value){
         setSorted(e)
         if(e.value === "1"){
            dispatch(getPosts({page: 1}))
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
         <ListPost posts={posts} page={page}/>
      </main>
   );
};
export default Home