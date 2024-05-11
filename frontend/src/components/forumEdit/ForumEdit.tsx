import React,{useState} from 'react'
import styles from './forumEdit.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_FORUM } from '../../mutations/forumMutations';
import { GET_FORUMS, GET_FORUM } from '../../queries/ForumQueries';
import Spinner from '../spinner/Spinner';
const ForumEdit = (props:{forumEditId:any, setOpenForumUpdate: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const id = props.forumEditId;
    const setOpenForumUpdate = props.setOpenForumUpdate
    const {data, loading, error} = useQuery(GET_FORUM, {variables:{id}})
    console.log(data, id)
    let forumThema:string = '';
    let formValue:string = '';
    if(data){
        formValue = data.forum.question;
        forumThema = data.forum.questionTheme;
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
      const [updateAnswer] = useMutation(UPDATE_FORUM,{
        refetchQueries:[{
            query:GET_FORUMS
        }]
      })
      const [forumTheme, setForumTheme] = useState({
        questionTheme:forumThema,
      })
      const {questionTheme} = forumTheme;
      const [value, setValue] = useState(formValue);
      const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            updateAnswer({variables:{id:id, questionTheme:questionTheme, question:value}})
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
            <span role="button" title="Schließen" onClick={()=>setOpenForumUpdate(false)}>X</span>
        </div>
        <div className={styles.formWrapper}>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="questionTheme" className={styles.label}>Meine Frage</label>
                    <input type="text"
                        id="questionTheme"
                        className={styles.input}
                        defaultValue={questionTheme}
                        onChange={(e)=>setForumTheme({...forumTheme, questionTheme:e.target.value})}
                     />
                </div>
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

export default ForumEdit