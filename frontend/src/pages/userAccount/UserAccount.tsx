import React,{useContext, useState, useCallback, useEffect} from 'react'
import styles from './userAccount.module.scss'
import { UserContext } from '../../userContext/UserContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {useDropzone} from 'react-dropzone';
import {useForm} from 'react-hook-form';
import { DELETE_USER, UPDATE_USER } from '../../mutations/userMutations';
import { GET_USER } from '../../queries/Userqueries';
import { GET_FORUMS } from '../../queries/ForumQueries';
import Spinner from '../../components/spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { ForumDocument } from '../../../../backend/models/Forum';
import {MdOutlineEdit, MdDelete} from 'react-icons/md';
import parse from 'html-react-parser';
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { DELETE_FORUM } from '../../mutations/forumMutations';
import ForumEdit from '../../components/forumEdit/ForumEdit';
import { ADD_USERMESSAGE } from '../../mutations/userMessageMutations';
import { GET_ADMINANSWERS } from '../../queries/AdminAnswerQuery';
import { AdminAnswerDocument } from '../../../../backend/models/AdminAnswer';
type FormValues = {
    vorname:string,
    nachname:string,
}
const UserAccount = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    if(!userContext){
        throw new Error('Da ist was schiefgelaufen')
    }
    const {user} = userContext;
    const username = user?.username;
    console.log(user)
    useEffect(()=>{
        if(user!.id !== id){
            navigate('/')
        }
    },[user, id, navigate])
    //hook-form
    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues:{
            vorname:user?.vorname,
            nachname:user?.nachname
        }
    })
    const {errors} = formState
      //files
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("")
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]))
  }, []);
 
    const {getRootProps, getInputProps} = useDropzone({onDrop})
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries:[
            {
                query:GET_USER
            }
        ]
    })
    const onSubmit = async (data:FormValues)=>{
        const {vorname, nachname} = data;
        if(!file){
            updateUser({variables:{id:id, vorname, nachname}})
        }
        else{
            const formdata = new FormData();
            formdata.append('profilePicture', file)
         
            const response = await fetch('http://localhost:5000/api/upload/profilePicture',{
                method:'POST',
                body:formdata,
            })
            const imagedata = await response.json();
            console.log(imagedata);
             await updateUser({variables:{id:id, vorname, nachname, profilePicture:imagedata.secure_url, cloudinaryId:imagedata.public_id}}).then((error)=>console.log(error))
        }
    }
    const {data, loading, error} = useQuery(GET_FORUMS);
    let catcher;
    if(data){
        catcher = data
    }
   
    let filteredForums;
    if(!loading && data && data.forums){
        filteredForums = data.forums.length && data.forums.filter((item:ForumDocument)=>item.userId === user?.id);
    }
    
     //delete and update Forum
     const [openForumUpdate, setOpenForumUpdate] = useState(false);
     const [forumEditId, setForumEditId] = useState(null);
     const handleQuestionUpdate = (id:any)=>{
         setForumEditId(id);
         setOpenForumUpdate(true);
     }
     const [deleteForum] = useMutation(DELETE_FORUM,{
         refetchQueries:[
             {
                 query:GET_FORUMS
             }
         ]
     })
     const handleQuestionDelete = (id:string)=>{
        deleteForum({variables:{id}})
     }
     //Account Delete and other functions
     //delete
     const [deleteUser] = useMutation(DELETE_USER);
     const [userdeleteOpen, setUserdeleteOpen] = useState(false);
     const handleUserDelete = (id:string)=>{
        deleteUser({variables:{id}})
        navigate('/')
     }
     //userMessage 
     const [addUsermessage] = useMutation(ADD_USERMESSAGE);
     const [messageOpen, setMessageOpen] = useState(false);
     const [userMessageFormValues, setUserMessageFormValues] = useState({
        userMessage:"",
     })
     const {userMessage} = userMessageFormValues;
     const onMessageSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        addUsermessage({variables:{userId: id, message:userMessage, username}})
        toast.success('Nachricht erfolgreich gesendet');
        setMessageOpen(false);
        setUserMessageFormValues({...userMessageFormValues, userMessage:""})
     }
     const {data:adminAnswersdata, loading:adminAnswersLoading, error: adminAnswersError} = useQuery(GET_ADMINANSWERS);
     const [filteredAnswers, setFilteredAnswers] = useState([])
    
     useEffect(()=>{
        if(adminAnswersdata && adminAnswersdata.length && !adminAnswersLoading){
            console.log(adminAnswersdata)
            setFilteredAnswers(adminAnswersdata.filter((item:AdminAnswerDocument)=>item.sendUsername === username))
        }
    },[adminAnswersdata, setFilteredAnswers, username, adminAnswersLoading])
     //
    if(error){
        toast.error('Bitte dem Admin Bescheid geben, das ein Fehler vorliegt');
    }
    console.log(user!.profilePicture)
    if(loading){
        return <Spinner/>
    }
    if(adminAnswersLoading){
        return <Spinner/>
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <div className={styles.backToForum}>
            <button className={styles.navigateBtn} onClick={()=>navigate(-1)}>Zurück</button>
        </div>
        <div className={styles.headerWrapper}>
            <div className={styles.topWrapper}>
                <h1>Dein Account</h1>
                <div className={styles.adminAnswers}>{filteredAnswers ? filteredAnswers.map((item:AdminAnswerDocument)=>(
                    <div className={styles.fieldWrapper}>
                        <div className={styles.headWrapper}>
                            <p>{item.adminname}</p>
                            </div>
                            <div className={styles.contentWrapper}>
                                <p>{`Hallo ${item.sendUsername}`}</p>
                                <p>{item.adminAnswer}</p>
                            </div>
                    </div>
                )):null}</div>
            </div>
            <div className={styles.deleteAccountWrapper}>
                {userdeleteOpen ? 
                <div className={styles.accountDeleteField}>
                    <div className={styles.warningWrapper}>
                        <p>Wollen Sie wirklich Ihren Account löschen?</p>
                        <p>Oder nutzen Sie die Möglichkeit uns eine Nachricht zu senden.</p>
                    </div>
                    <div className={styles.warnButtonWrapper}>
                        <button className={styles.delete} onClick={()=>handleUserDelete(id!)}>Account löschen</button>
                        <button className={styles.adminQuestion} onClick={()=>setMessageOpen(true)}>Nachricht an die Admins</button>
                        <button className={styles.goBack} onClick={()=>setUserdeleteOpen(false)}>Nein, ich schließe das wieder</button>
                    </div>
                    {messageOpen ? <div className={styles.messageField}>
                        <div className={styles.messageFormWrapper}>
                            <form className={styles.form} onSubmit={onMessageSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="userMessage" className={styles.label}>Nachricht an die Admins</label>
                                    <textarea name="userMessage" 
                                                id="userMessage" 
                                                cols={20} 
                                                rows={10}
                                                data-testid="userMessage"  
                                                value={userMessage} 
                                                onChange={(e)=>setUserMessageFormValues({...userMessageFormValues, userMessage:e.target.value})}
                                                ></textarea>
                                </div>
                                <div className={styles.buttonWrapper}>
                                    <button type="submit" className={styles.sendBtn}>Absenden</button>
                                </div>
                            </form>
                        </div>
                    </div> : null}
                </div> : 
                <button type="button" className={styles.sendBtn} onClick={()=>setUserdeleteOpen(true)}>Account löschen</button>}
            </div>
        </div>
        <div className={styles.userWrapper}>
            <div className={styles.userData}>
                <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.userProfilePicture}>
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} className={styles.dropzone}/>
                    <span>{preview ? <img src={preview} alt={user?.username}/> :<img src={user?.profilePicture ? user?.profilePicture : '/images/placeholderprofile.jpg'} alt="Bild hier hineinziehen oder klicken um es einzufügen" title="Bild hier hineinziehen oder klicken um es einzufügen"/>}</span>
                </div>
            </div>
                <div className={styles.formfields}>
                    <div className={styles.formGroup}>
                        <label htmlFor="vorname" className={styles.label}>Vorname</label>
                        <input type="text" 
                                id="vorname" 
                                data-testid="vorname"
                                className={styles.input}
                                {...register('vorname',{
                                    required:{
                                    value:true,
                                    message:"Vorname ist ein Pflichtfeld"
                                    }
                        })}/>
                        <div className="errors">{errors.vorname?.message}</div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nachname" className={styles.label}>Nachname</label>
                        <input type="text" 
                                id="nachname" 
                                data-testid="nachname"
                                className={styles.input}
                                {...register('nachname',{
                                    required:{
                                    value:true,
                                    message:"Nachname ist ein Pflichtfeld"
                                    }
                        })}/>
                        <div className="errors">{errors.nachname?.message}</div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button type="submit" className={styles.sendBtn}>Meine Daten updaten</button>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <hr className={styles.row}/>
        <div className={styles.contentWrapper}>{filteredForums.length ? filteredForums.map((item:ForumDocument)=>(
            <Link to={{pathname:`/accountUserForum/${item.id}`}} className='link' id={styles.accountLink} key={item.id} title={item.questionTheme}>
                <div className={styles.fieldWrapper}>
                <div className={styles.postWrapper}>
                        <div className={styles.headWrapper}>
                            <p>{item.username}</p>
                            <p>{item.questionTheme}</p>
                            <div className={styles.deleteOrUpadate}>
                                <div className={styles.deleteOrUpdateIcons}>
                                <MdOutlineEdit className={styles.icon} onClick={()=>handleQuestionUpdate(item.id)}/>
                                <MdDelete className={styles.icon} onClick={()=>handleQuestionDelete(item.id)}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.questionWrapper}>
                            {parse(`<p>${item.question}</p>`)}
                        </div>
                        <div className={styles.likesWrapper}>
                            <div className={styles.like}>
                                <span>{item.likes > 0 ? item.likes : null}</span>
                            <BiLike className={styles.icon}/>
                            </div>
                            <div className={styles.dislike}>
                                <span>{item.dislikes > 0 ? item.dislikes : null}</span>
                            <BiDislike className={styles.icon}/>
                            </div>
                            <div className={styles.solved}>
                            <IoMdCheckmarkCircle className={styles.icon} style={item.isAnswered && {color:"yellow"}}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.extrasWrapper}>
                        <img src={item.profilePicture !== null ? item.profilePicture : '/images/placeholderprofile.jpg'} alt={item.username} className={styles.image}/>
                    </div>
                </div>
            </Link>
        )):null}</div>
        <div className={styles.accountUpdate}>{openForumUpdate ? <ForumEdit forumEditId={forumEditId} setOpenForumUpdate={setOpenForumUpdate}/> : null}</div>
    </div>
  )
}

export default UserAccount