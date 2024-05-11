import React,{useState, useContext} from 'react'
import styles from './adminMessage.module.scss';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERMESSAGES } from '../../../queries/UsermessageQueries';
import Spinner from '../../spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {UserMessageDocument} from '../../../../../backend/models/UserMessage';
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import { DELETE_USERMESSAGE } from '../../../mutations/userMessageMutations';
import { DELETE_USER } from '../../../mutations/userMutations';
import { UserContext } from '../../../userContext/UserContext';
import { ADD_ADMINANSWER, DELETE_ADMINANSWER } from '../../../mutations/adminAnswerMutations';
import { GET_ADMINANSWER, GET_ADMINANSWERS } from '../../../queries/AdminAnswerQuery';
import {AdminAnswerDocument} from '../../../../../backend/models/AdminAnswer';
import { FaCheck } from "react-icons/fa";
import EditAdminAnswer from '../../dashboardEditComponents/editAdminAnswer/EditAdminAnswer';
const AdminMessage = () => {
    const userContext = useContext(UserContext);
    if(!userContext){
        toast.error('Schau mal nach da stimmt etwas mit dem UserContext nicht');
        throw new Error('userContext funktioniert nicht')
    }
    const {user} = userContext;
    const myId = user!.id as string;
    const myName = user!.username as string;
    const {data, loading, error} = useQuery(GET_USERMESSAGES);
  
    if(error){
        toast.error('Schau mal nach, da läuft was mit den Usermessages schief')
    }
    //delete usermessage
    const [deleteUsermessage] = useMutation(DELETE_USERMESSAGE,{
        refetchQueries:[
            {
                query: GET_USERMESSAGES
            }
        ]
    })
    const handleDelete = (id:string)=>{
        deleteUsermessage({variables:{id:id}})
    }
    //delete User
    const [deleteUser] = useMutation(DELETE_USER,{
        refetchQueries:[
            {
                query: GET_USERMESSAGES
            }
        ]
    })
    const handleDeleteUser = (id:string)=>{
        deleteUser({variables:{id:id}})
    }
    //answering
    const [answerOpen, setAnswerOpen] = useState(false);
    const [answerdata, setAnswerdata] = useState({
        firstMessageId:"",
        sendUserId:"",
        sendUsername:"",
        adminname:"",
        adminId:"",
        adminAnswer:"",
    })
    const {firstMessageId, sendUserId, sendUsername, adminname, adminId, adminAnswer} = answerdata;
    const handleAnswer = (usermessageId:string, userId:string, username:string)=>{
        setAnswerdata((prevState)=>({
            ...prevState,
            firstMessageId: usermessageId,
            sendUserId:userId,
            sendUsername:username,
            adminname:myName,
            adminId:myId,
        }))
        setAnswerOpen(true);
    }
    const [addAdminAnswer] = useMutation(ADD_ADMINANSWER, {
        refetchQueries:[
            {
                query: GET_ADMINANSWERS
            },{
                query:GET_USERMESSAGES
            }
        ]
    });
    const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        if(adminAnswer === ""){
            toast.error("Wenn du eine Antwort geben willst, musst du auch eine eingeben")
        }
        else{
            try{
                addAdminAnswer({variables:{firstMessageId, sendUserId, sendUsername, adminId, adminname, adminAnswer}})
                toast.success('Antwort erfolgreich');
                setAnswerOpen(false);
            } catch(error){
                console.log(error)
                toast.error('Anwort hat nicht funktioniert')
            }
        }
    }
    //adminAnswers Data
    const {data:adminAnswerdata, loading:adminAnswerLoading, error:adminAnswerError} = useQuery(GET_ADMINANSWERS);
    //adminAnsweres update and delete
    const [deleteAdminAnswer] = useMutation(DELETE_ADMINANSWER,{
        refetchQueries:[
            {
                query:GET_ADMINANSWERS
            }
        ]
    })
    const handleAnswerDelete = (id:string)=>{
        deleteAdminAnswer({variables:{id}})
    }
    //edit adminanswer
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const handleAnswerUpdate = (id:any)=>{
        setEditId(id);
        setEditOpen(true);
    }
    const {data:editAnswerdata, loading:editAnswerLoading, error:editAnswerError} = useQuery(GET_ADMINANSWER,{variables:{id:editId}});

    if(loading){
        return <Spinner/>
    }
    if(adminAnswerLoading){
        return <Spinner/>
    }
    if(editAnswerLoading){
        return <Spinner/>
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <div className={styles.displayUserMessages}>
            <h3>Nachrichten von Usern</h3>
            {data && data.usermessages ? data.usermessages.map((item:UserMessageDocument)=>(
                <div className={styles.fieldWrapper} key={item.id}>
                    <div className={styles.headWrapper}>
                        <p>{item.username}</p>
                        <span>{new Date(item.createdAt).toLocaleDateString('de-De',{
                            weekday:"short",
                            day:"2-digit",
                            month:"long",
                            year:"2-digit"
                        })}</span>
                    </div>
                    <div className={styles.messageWrapper}>
                        <p>{item.message}</p>
                    </div>
                    <div className={styles.deleteAndDefineWrapper}>
                    <MdDeleteOutline className={styles.icon} onClick={()=>handleDelete(item.id)} title="Nachricht löschen"/>
                    <AiOutlineUserDelete className={styles.icon} onClick={()=>handleDeleteUser(item.userId)} title="Nutzer löschen"/>
                    <BsFillReplyFill className={styles.icon} onClick={()=>handleAnswer(item.id, item.userId, item.username)} title="Antworten"/>
                    {item.isAnswered && <><span>{new Date(item.updatedAt).toLocaleDateString('de-De',{
                        weekday:"short",
                        day:"2-digit",
                        month:"short",
                        year:"2-digit"
                    })}</span><FaCheck className={styles.icon} style={{color:"green"}}/></>}
                    </div>
                </div>
            )):null}
        </div>
        <div className={styles.displayAdminMessages}>
            <h3>Meine Antworten</h3>
        {adminAnswerdata ? adminAnswerdata.adminAnswers.map((item:AdminAnswerDocument)=>(
                <div className={styles.fieldWrapper} key={item.id}>
                    <div className={styles.headWrapper}>
                        <p>{item.adminname}</p>
                        <span>{new Date(item.createdAt).toLocaleDateString('de-De',{
                            weekday:"short",
                            day:"2-digit",
                            month:"long",
                            year:"2-digit"
                        })}</span>
                    </div>
                    <div className={styles.messageWrapper}>
                        <p>{`Frage von User ${item.sendUsername}`}</p>
                        <p>{item.adminAnswer}</p>
                    </div>
                    <div className={styles.deleteAndUpdateWrapper}>
                    <MdDelete className={styles.icon} onClick={()=>handleAnswerDelete(item.id)} />
                    <MdOutlineEdit className={styles.icon} onClick={()=>handleAnswerUpdate(item.id)}/>
                    </div>
                </div>
            )):null}
        </div>
        {answerOpen ? <div className={styles.answerFormWrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.headerGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstMessageId">Nachricht Id:</label>
                        <input type="text"
                                id="firstMessageId"
                                name="firstMessageId"
                                value={firstMessageId} 
                                readOnly/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="sendUserId">Gesendet von Id:</label>
                        <input type="text"
                                id="sendUserId"
                                name="sendUserId"
                                value={sendUserId} 
                                readOnly/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="sendUsername">Nutzer:</label>
                        <input type="text"
                                id="sendUsername"
                                name="sendUsername"
                                value={sendUsername} 
                                readOnly/>
                    </div>
                </div>
                <div className={styles.myDataGroup}>
                <div className={styles.formGroup}>
                        <label htmlFor="myName">Admin Name</label>
                        <input type="text"
                                id="myName"
                                name="myName"
                                value={adminname} 
                                readOnly/>
                    </div>
                <div className={styles.formGroup}>
                        <label htmlFor="myId">Meine Id:</label>
                        <input type="text"
                                id="myId"
                                name="myId"
                                value={adminId} 
                                readOnly/>
                    </div>
                </div>
                <div className={styles.answerMessage}>
                    <label htmlFor="adminAnswer">Meine Antwort: </label>
                    <textarea name="adminAnswer" 
                                id="adminAnswer" 
                                cols={10} 
                                rows={10}
                                value={adminAnswer}
                                onChange={(e)=>setAnswerdata({...answerdata, adminAnswer:e.target.value})}></textarea>
                </div>
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.sendBtn}>Absenden</button>
                </div>
            </form>
        </div> : null}
        <div className={styles.editAnswer}>{editOpen ? <EditAdminAnswer editId={editId} setEditOpen={setEditOpen} editAnswerData={editAnswerdata}/> : null}</div>
    </div>
  )
}

export default AdminMessage