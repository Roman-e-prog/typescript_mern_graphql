import React,{useContext, useState, useEffect} from 'react'
import styles from './forumAnswer.module.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../userContext/UserContext';
import { useMutation} from '@apollo/client';
import { ADD_ANSWER } from '../../mutations/forumAnswerMutations';
import { GET_FORUM, GET_FORUMS } from '../../queries/ForumQueries';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AnswerOnAnswerType } from '../../pages/singleForumQuestion/SingleForumQuestion';
import { GET_FORUMANSWERS } from '../../queries/ForumAnswerQueries';
const ForumAnswer = (props:{questionId:any, setOpenAnswer:React.Dispatch<React.SetStateAction<boolean>>, answerOnAnswerData:AnswerOnAnswerType}) => {
    const questionId = props.questionId;
    const setOpenAnswer = props.setOpenAnswer;
    const answerOnAnswer = {...props.answerOnAnswerData};
    const userContext = useContext(UserContext);
    if (!userContext) {
      throw new Error("Navbar must be used within a UserProvider");
    }
    const {user} = userContext;
    const userId = user?.id;
    const senderId = user?.id;
    const sendername = user?.username;
    const senderProfilePicture = user?.profilePicture;
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];
      const modules = {
        toolbar: toolbarOptions
      };
      const [value, setValue] = useState('');
      //mutation
      const [addAnswer] = useMutation(ADD_ANSWER,{
            refetchQueries:[
                {
                    query: GET_FORUMANSWERS
                }
            ]
      })
      console.log(answerOnAnswer)
      useEffect(()=>{
        if(answerOnAnswer && answerOnAnswer.questionId !== ''){
          answerOnAnswer.answer = value
        }
      },[answerOnAnswer, value])
      const onAnswerSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        console.log('Ich habs gesendet')
        const {questionId, senderId, sendername, senderProfilePicture, answererId, answererUsername, answer} = answerOnAnswer;
        addAnswer({variables:{questionId:questionId, senderId:senderId, sendername:sendername, senderProfilePicture:senderProfilePicture, answererId:answererId, answererUsername:answererUsername, answer}})
      }
      const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            addAnswer({variables:{questionId:questionId, senderId:senderId, sendername:sendername, senderProfilePicture:senderProfilePicture, answer:value}})
        } catch(error:any){
            console.log(error.message);
            toast.error('Da hat was nicht geklappt')
        }
      }
  return (
    <div className={styles.container}>
        <ToastContainer/>
           <div className={styles.closeWrapper}>
            <span role="button" title="Schließen" onClick={()=>setOpenAnswer(false)}>X</span>
        </div>
        <div className={styles.formWrapper}>{!userId ? <div className={styles.stop}>
          <p>Sie müssen sich einloggen, um eine Frage zu beantworten</p>
          <Link to="/login" className='link' id={styles.loginLink}>Zum Login</Link>
          </div> : <form className={styles.form} onSubmit={answerOnAnswer.questionId !== "" ? (e)=>onAnswerSubmit(e) : (e)=>onSubmit(e)}>
                <div className={styles.questionContainer}>
                 <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} className={styles.answerInput}/>
                </div>
                <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.sendButton}>Absenden</button>
              </div>
            </form>}
        </div>
    </div>
  )
}

export default ForumAnswer