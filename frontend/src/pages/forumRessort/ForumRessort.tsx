import React, {useEffect, useState, useContext} from 'react'
import styles from './forumRessort.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FORUMS } from '../../queries/ForumQueries';
import Spinner from '../../components/spinner/Spinner';
import {ForumDocument} from '../../../../backend/models/Forum';
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { UPDATE_VIEWS } from '../../mutations/forumMutations';
import { UserContext } from '../../userContext/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import parse from 'html-react-parser';
import UserQuestion from '../../components/userQuestion/UserQuestion';
import Navbar from '../../components/navbar/Navbar';
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar';
const ForumRessort = () => {
    const {ressort} = useParams();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(()=>{
      const handleResize = ()=>setInnerWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return ()=>window.removeEventListener('resize', handleResize)
    },[setInnerWidth])
    
    const {data:forumData, loading:forumLoading, error:forumError} = useQuery(GET_FORUMS);
    const [forumContent, setForumContent] = useState<ForumDocument[]>([]);

    useEffect(()=>{
      if(forumData){
        if(ressort === 'HTML'){
          setForumContent(forumData.forums.filter((item:ForumDocument)=>item.ressort === 'HTML'))
        } 
        else if(ressort === 'CSS'){
          setForumContent(forumData.forums.filter((item:ForumDocument)=>item.ressort === 'CSS'))
        } 
        else{
          setForumContent(forumData.forums.filter((item:ForumDocument)=>item.ressort === 'JavaScript'))
        }
      }
    },[forumData, setForumContent, ressort])
    const userContext = useContext(UserContext);
    if (!userContext) {
      throw new Error("Navbar must be used within a UserProvider");
    }
    const {user} = userContext;
    function timeSince(date:Date) {
      var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
      var interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
    
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
    
      return Math.floor(seconds) + " seconds";
    }
    //mutations
    const [updateViews] = useMutation(UPDATE_VIEWS,{
      refetchQueries:[
        {
          query:GET_FORUMS
        }
      ]
    })
    const handleViews = (id:string)=>{
      updateViews({variables:{id}})
    }
    //Neue Frage
    const [questionOpen, setQuestionOpen] = useState(false);
    const handleQuestion = ()=>{
      if(!user){
        toast.error('Um eine Frage stellen zu können, müssen Sie sich einloggen')
      } else{
        setQuestionOpen(true)
      }
    }
    if(forumLoading){
      return <Spinner/>
    }
  return (
    <div className={styles.container}>
    {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <ToastContainer/>
      <div className={styles.topic}>
        {questionOpen ? <UserQuestion ressort={ressort} setQuestionOpen={setQuestionOpen}/> : <button className={styles.topicButton} onClick={handleQuestion} data-testid="newTopic">New Topic</button> }
      </div>
      <div className={styles.contentWrapper}>
        {forumContent ? forumContent.map((item)=>(
          <div className={styles.fieldWrapper} key={item.id}>
            <Link to={{pathname:`/${ressort}/${item.id}`}} className='link' id={styles.forumQuestionLink} title="Zum Beitrag" onClick={()=>handleViews(item.id)}>
              <div className={styles.postWrapper}>
                <div className={styles.headWrapper}>
                  <p>{item.ressort} </p>
                  <p>{item.questionTheme}</p>
                </div>
                <div className={styles.questionWrapper}>
                  {parse(`<p>${item.question}</p>`)}
                </div>
                <div className={styles.likesWrapper}>
                  <div className={styles.liked}>{item.likes > 0 ? item.likes: null}
                  <BiLike title="likes" className={styles.icon}/>
                  </div>
                  <div className={styles.disliked}>{item.dislikes > 0 ? item.dislikes: null}
                  <BiDislike title="dislikes" className={styles.icon}/>
                  </div>
                  <div className={styles.isSolved}>
                  <IoMdCheckmarkCircle title={item.isAnswered ? "Die Frage ist gelöst" : "Brauche bitte eine Antwort"} style={item.isAnswered && {color:"yellow"}} className={styles.icon}/>
                  </div>
                </div>
              </div>
              <div className={styles.extrasWrapper}>
                  <div className={styles.profilePicture}>
                    <img src={item.profilePicture !== null ? item.profilePicture : '/images/placeholderprofile.jpg'} alt={item.username} title={item.username}/>
                  </div>
                  <div className={styles.views}>
                    <p>Views:</p>
                    <span>{item.views}</span>
                  </div>
                  <div className={styles.since}></div>
                  <div className={styles.time}>
                      <p>Gepostet vor:</p>
                      <span className={styles.since}>{timeSince(new Date(item.createdAt))}</span>
                    </div>
              </div>
            </Link>
          </div>
        )):null}
      </div>
    </div>
  )
}

export default ForumRessort