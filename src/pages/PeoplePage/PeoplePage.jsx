import React, {useEffect} from 'react'
import styles from './PeoplePage.module.scss'
import PeopleItem from '../../components/PeopleItem/PeopleItem'
import { getPeople, getPeopleFollowers, getPeopleFollowing } from '../../store/people/peopleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'

const PeoplePage = () => {
   const dispatch = useDispatch()
   const youUserId = useParams().id
   const locationPage = useLocation().pathname.split('/')[2]
   const { people, loading } = useSelector(state => state.people)

   useEffect(()=>{
      if(!!youUserId && locationPage === 'followers'){
         console.log('followers')
         dispatch(getPeopleFollowers(youUserId))
      }
      else if(!!youUserId && locationPage === 'following'){
         console.log('following')
         dispatch(getPeopleFollowing(youUserId))
      }
      else{
         dispatch(getPeople())
      }
   }, [dispatch, youUserId])

   return (
      <div className={styles.people_list}>
         {loading
            ?<Loader/>
            :people.length 
               ?people.map(user => 
                  <PeopleItem key={user._id} infoUser = {user}/>
               )
               :<h2>Пользователи отсутствуют</h2>
         }
      </div>
   );
};
export default PeoplePage