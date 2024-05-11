import React,{useEffect, useState} from 'react'
import styles from './editForumAnswer.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ANSWER } from '../../mutations/forumAnswerMutations';
import { GET_FORUMANSWER, GET_FORUMANSWERS } from '../../queries/ForumAnswerQueries';
import Spinner from '../spinner/Spinner';
const EditForumAnswer = (props:{editId:any, setEditAnswerOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const id = props.editId;
    const setEditAnswerOpen = props.setEditAnswerOpen
    const {data, loading, error} = useQuery(GET_FORUMANSWER, {variables:{id}})
    console.log(data);
    let forumAnswer:string = '';
    if(data){
      forumAnswer = data.forumAnswer.answer;
    }
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
      const [updateAnswer] = useMutation(UPDATE_ANSWER,{
        refetchQueries:[{
            query:GET_FORUMANSWERS
        }]
      })
      const [value, setValue] = useState(forumAnswer);
      console.log(id, value)
      const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        console.log('I am triggered')
        try{
            updateAnswer({variables:{id:id, answer:value}})
        } catch(error:any){
            console.log(error.message)
        }
      }
      if(loading){
        return <Spinner/>
      }
  return (
    <div className={styles.container}>
        <ToastContainer/>
           <div className={styles.closeWrapper}>
            <span role="button" title="Schließen" onClick={()=>setEditAnswerOpen(false)}>X</span>
        </div>
        <div className={styles.formWrapper}>
          <form onSubmit={onSubmit}>
              <div className={styles.formGroup}>
                <div className={styles.questionContainer}>
                  <ReactQuill theme="snow" modules={modules} defaultValue={value} onChange={setValue} className={styles.answerEditInput}/>
                  </div>
                  <div className={styles.buttonWrapper}>
                  <button type="submit" className={styles.sendButton}>Absenden</button>
                </div>
              </div>
            </form>
        </div>
    </div>
  )
}

export default EditForumAnswer