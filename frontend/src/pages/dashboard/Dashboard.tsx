import React,{useContext, useEffect} from 'react'
import styles from './dashboard.module.scss'
import UeberMichComponent from '../../components/dashboardComponents/uebermich/UeberMichComponent';
import { UserContext } from '../../userContext/UserContext';
import { useNavigate } from 'react-router-dom';
import BlogpostComponent from '../../components/dashboardComponents/blogPosts/BlogpostComponent';
import ForumThemes from '../../components/dashboardComponents/forumThemes/ForumThemes';
import AdminMessage from '../../components/dashboardComponents/adminMessages/AdminMessage';
import AdminForum from '../../components/dashboardComponents/adminForum/AdminForum';
import BibliothekComponent from '../../components/dashboardComponents/bibliothek/BibliothekComponent';
const Dashboard = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("Dashboard must be used within a UserProvider");
  }
  const {user} = userContext;
  useEffect(()=>{
    if(!user){
      navigate('/')
    }
    if(user){
      if(!user.isAdmin){
          navigate('/')
      }
    }
  },[user, navigate])
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <UeberMichComponent/>
      <BlogpostComponent/>
      <ForumThemes/>
      <AdminMessage/>
      <AdminForum/>
      <BibliothekComponent/>
    </div>
  )
}

export default Dashboard