import React,{useState, useContext, useEffect} from 'react'
import styles from './userQuestion.module.scss'
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../userContext/UserContext';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_FORUM } from '../../mutations/forumMutations';
import {GET_FORUMS } from '../../queries/ForumQueries';
import { ForumDocument } from '../../../../backend/models/Forum';
import Spinner from '../spinner/Spinner';

const UserQuestion = (props:{ressort?:string, setQuestionOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {

  const userContext = useContext(UserContext);
if (!userContext) {
  throw new Error("Navbar must be used within a UserProvider");
}
const {user} = userContext;

    const setQuestionOpen = props.setQuestionOpen;
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

      const [formValues, setFormValues] = useState({
        questionTheme:"",
        ressort:props.ressort,
      })
      const {questionTheme, ressort} = formValues;
     
      console.log(formValues);
      //mutations
      const [addForum] = useMutation(ADD_FORUM, {
        refetchQueries:[
            {
                query:GET_FORUMS
            }
        ]
      })
      //query and search
      const {data, loading,error} = useQuery(GET_FORUMS);

      const [filteredValues, setFilteredValues] = useState([]);
      useEffect(()=>{
        if(questionTheme !== "" && questionTheme.length > 10){
            setFilteredValues( data.forums.filter((item:ForumDocument)=>{
                return Object.values(item).join().toLowerCase().includes(questionTheme.toLowerCase())
            }))
        }
      },[questionTheme, data])
      const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            addForum({variables:{ressort:ressort, username:user!.username, userId:user!.id, questionTheme:questionTheme, question:value, userIsAdmin:user!.isAdmin, profilePicture:user!.profilePicture}})
            setValue('');
            setFormValues({...formValues, questionTheme:""})
        } catch(error){
          console.log(error)
        }
      }
      if(loading){
        return <Spinner/>
      }
  return (
    <div>
        <div className={styles.closeWrapper}>
            <span role="button" title="Schließen" onClick={()=>setQuestionOpen(false)}>X</span>
        </div>
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={onSubmit} data-testid="topicForm">
                <div className={styles.questionContainer}>
                    <div className={styles.headerGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="questionTheme">Deine Frage</label>
                            <input 
                                type="text" 
                                id="questionTheme" 
                                name="questionTheme" 
                                data-testid="questionTheme"
                                value={questionTheme}
                                onChange={(e)=>setFormValues({...formValues, questionTheme:e.target.value})} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="ressort">Ressort</label>
                            <input 
                                type="text" 
                                id="ressort" 
                                name="ressort" 
                                data-testid="questionRessort"
                                readOnly
                                value={ressort}
                                 />
                        </div>
                    </div>
                 <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} style={{color:'#ccc'}}/>
                </div>
                <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.sendButton} data-testid="questionButton">Absenden</button></div>
            </form>
         </div>
         {filteredValues.length > 0 ? <div>
            <div className={styles.filteredHeader}>
                <h2>Schau mal ob deine Frage schon mal gestellt wurde</h2>
            </div>
            <div className={styles.filterWrapper}>{filteredValues.length > 0 && filteredValues.map((item:ForumDocument)=>(
                <div className={styles.itemWrapper} key={item.id}>
                    <h3>{item.questionTheme}</h3>
                    <p>{item.question}</p>
                </div>
            ))}</div>
         </div> : null}
    </div>
  )
}

export default UserQuestion