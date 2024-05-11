import React,{useContext, useState, useEffect} from 'react'
import styles from './forum.module.scss'
import { useQuery } from '@apollo/client'
import { GET_FORUMTHEMES } from '../../queries/ForumThemeQueries'
import forumlinks from '../../jsons/forumlinks.json'
import { Link } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { ForumThemeDocument } from '../../../../backend/models/ForumTheme'
import Navbar from '../../components/navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../userContext/UserContext'
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar'
const Forum = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  },[setInnerWidth])
  const userContext = useContext(UserContext);
  if(!userContext){
    throw new Error('Da ist was schiefgelaufen')
  }
  const {user} = userContext;
  const {data, loading, error} = useQuery(GET_FORUMTHEMES);
  if(error){
    toast.error('Derzeit in Wartung')
  }
  if(loading){
    return <Spinner/>
  }
  return (
    <div className={styles.container}>
      {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <div className={styles.linkBar}>
        <ul>
          {forumlinks ? forumlinks.map((item)=>(
          <li key={item.id}>
              <button type='button' className={styles.forumButton}><Link to={{pathname:`/forum/${item.ressort}`}} className='link' id={styles.forumLink}>{item.ressort}</Link>
              </button>
            </li>
          )):null}
          {user ? <li> <button type='button' className={styles.forumButton}><Link to={{pathname:`/account/${user.id}`}} className='link' id={styles.forumLink}>{user.username}</Link>
              </button></li> : null}
        </ul>
      </div>
      <div className={styles.content}>{data.forumThemes ? data.forumThemes.map((item:ForumThemeDocument)=>(
          <div className={styles.fieldWrapper} key={item.id}>
            <h3>{item.forumtheme}</h3>
            <p>{item.forumcontent}</p>
          </div>
      )):null}</div>
    </div>
  )
}

export default Forum