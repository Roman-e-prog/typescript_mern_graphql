import React, {useContext, useState, useEffect} from 'react'
import styles from './singleForumQuestion.module.scss';
import { useParams} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FORUM, GET_FORUMS } from '../../queries/ForumQueries';
import Spinner from '../../components/spinner/Spinner';
import parse from 'html-react-parser';
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsFillReplyFill } from "react-icons/bs";
import { UserContext } from '../../userContext/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UPDATE_LIKES, UPDATE_DISLIKES, DELETE_FORUM} from '../../mutations/forumMutations';
import ForumAnswer from '../../components/forumAnswer/ForumAnswer';
import { GET_FORUMANSWER, GET_FORUMANSWERS } from '../../queries/ForumAnswerQueries';
import {ForumAnswerDocument} from '../../../../backend/models/ForumAnswer';
import {MdOutlineEdit, MdDelete} from 'react-icons/md';
import { DELETE_ANSWER, HAS_SOLVED, UPDATE_ANSWERDISLIKES, UPDATE_ANSWERLIKES } from '../../mutations/forumAnswerMutations';
import EditForumAnswer from '../../components/editForumAnswer/EditForumAnswer';
import ForumEdit from '../../components/forumEdit/ForumEdit';
import { useNavigate } from 'react-router-dom';
export type AnswerOnAnswerType = {
    questionId:any,
    senderId:string,
    sendername:string,
    senderProfilePicture:string,
    answer:string,
    answererUsername:string,
    answererId:string,
  }
const SingleForumQuestion = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [updateLikes] = useMutation(UPDATE_LIKES,{
        refetchQueries:[
            {
                query: GET_FORUMS,
            }
        ]
    })
    const [updateDislikes] = useMutation(UPDATE_DISLIKES,{
        refetchQueries:[
            {
                query: GET_FORUMS,
            }
        ]
    })
    const {data, loading, error} = useQuery(GET_FORUM,{variables:{id:id}})
   
    let forumId:string = '';
    if(data && data.forum){
        forumId = data.forum.id;
    }

    const userContext = useContext(UserContext);
    if(!userContext){
        throw new Error('Da ist was nicht in Ordnung')
    }
    const {user} = userContext;
    const userId = user?.id;
        
    const handleLike = (id:string)=>{
        if(data.forum.userId === userId || userId === undefined || data.forum.likesIds.includes(userId) || data.forum.dislikesIds.includes(userId)){
            return;
        }
        else{
            updateLikes({variables:{id:forumId, likeUserId:userId}})
        }
    }
    const handleDislike = (id:string)=>{
        if(data.forum.userId === userId || userId === undefined || data.forum.likesIds.includes(userId) || data.forum.dislikesIds.includes(userId)){
            return;
        }
        else{
            updateDislikes({variables:{id:forumId, likeUserId:userId}})
        }
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
        if(userId !== data.forum.userId || userId === undefined || !user!.isAdmin || data.forum.isAnswered){
            return;
        }
        else{
            deleteForum({variables:{id}})
        }
    }
    //answer
    const [openAnswer, setOpenAnswer] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    const handleReply = (id:any)=>{
        setQuestionId(id);
        setOpenAnswer(true);
    }
    //answerFetching, answer Delete or update and answerLikes
    const {data: answerData, loading:answerLoading, error: answerError} = useQuery(GET_FORUMANSWERS);
    const [filteredAnswers, setFilteredAnswers] = useState<ForumAnswerDocument[]>([]);
    useEffect(()=>{
        if(answerData && forumId !== ''){
            setFilteredAnswers(answerData.forumAnswers.filter((item:ForumAnswerDocument)=>item.questionId === forumId))
        }
    },[answerData, setFilteredAnswers, forumId])
    //deleteOrUpdate
    const [deleteAnswer] = useMutation(DELETE_ANSWER, {
        refetchQueries:[
            {
                query:GET_FORUMANSWERS
            }
        ]
    })

    const handleDelete = (id:any)=>{
        deleteAnswer({variables:{id:id}})
    }
    const [editAnswerOpen, setEditAnswerOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const handleUpdate = (id:any)=>{
        setEditId(id);
        setEditAnswerOpen(true);
    }
    //answerlikes, solved and reply
    const [updateAnswerlikes] = useMutation(UPDATE_ANSWERLIKES, {
        refetchQueries:[
            {
                query:GET_FORUMANSWERS
            }
        ]
    })
    const [updateAnswerdislikes] = useMutation(UPDATE_ANSWERDISLIKES, {
        refetchQueries:[
            {
                query:GET_FORUMANSWERS
            }
        ]
    })
    const [hasSolved] = useMutation(HAS_SOLVED, {
        refetchQueries:[
            {
                query:GET_FORUMANSWERS
            },
            {
                query:GET_FORUMANSWER
            }
        ]
    })
    const handleAnswerLike = (id:any, senderId:string, likAnswerIds:string[], dislikeAnswerIds:string[])=>{
        if(userId === senderId ||  userId === undefined || likAnswerIds.includes(userId) || dislikeAnswerIds.includes(userId)){
            return;
        }
        else{
            try{
                updateAnswerlikes({variables:{id:id, answerLikeUserId:userId}})
            } catch(error:any){
                console.log(error.message)
            }
        }
        
    }
    const handleAnswerDislike = (id:any, senderId:string, dislikeAnswerIds:string[], likesAnswerIds:string[])=>{
        if(userId === senderId || userId === undefined || dislikeAnswerIds.includes(userId) || likesAnswerIds.includes(userId)){
            return;
        }
        else{
            try{
                updateAnswerdislikes({variables:{id:id, answerDislikeUserId:userId}})
            } catch(error:any){
                console.log(error.message)
            }
        }
    }
    const handleSolved = (id:any, questionId:string)=>{
        if(userId !== data.forum.userId){
            return;
        }
        else{
            try{
                hasSolved({variables:{id, questionId}})
            } catch(error:any){
                console.log(error.message)
            }
        }
    }
    //answer on answer
    const [answerOnAnswerData, setAnswerOnAnswerData] = useState<AnswerOnAnswerType>({
        questionId:"",
        senderId:"",
        sendername:"",
        senderProfilePicture:"",
        answererUsername:"",
        answererId:"",
        answer:"",
    })
    const handleAnswerReply = (senderId:any, sendername:string)=>{
        if(!user){
            toast.error('Sie müssen eingeloggt sein, um eine Antwort geben zu können')
            return;
        } else{
            setAnswerOnAnswerData((prevState)=>({
                ...prevState,
                questionId:forumId,
                senderId:senderId,
                sendername:sendername,
                senderProfilePicture:user.profilePicture,
                answererUsername:user.username,
                answererId:user.id!,
                answer:"",
               
            }))
            setOpenAnswer(true);
        }
    }
    console.log(filteredAnswers)
   if(loading){
    return <Spinner/>
   }
   if(answerLoading){
    return <Spinner/>
   }
  return (
    <div className={styles.container}>
        <div className={styles.backToForum}>
            <button className={styles.navigateBtn} onClick={()=>navigate(-1)}>Zurück</button>
        </div>
        <div className={styles.putAnswer}>{openAnswer ? <ForumAnswer questionId={questionId} setOpenAnswer={setOpenAnswer} answerOnAnswerData={answerOnAnswerData}/> : null}</div>
        <div className={styles.editAnswer}>{editAnswerOpen ? <EditForumAnswer editId={editId} setEditAnswerOpen={setEditAnswerOpen}/> : null}</div>
        <div className={styles.editForumQuestion}>
            {openForumUpdate ? <ForumEdit forumEditId={forumEditId} setOpenForumUpdate={setOpenForumUpdate}/> : null}
        </div>
        <ToastContainer/>
        <div className={styles.chatWrapper}>
                <div className={styles.fieldWrapper}>
                    <div className={styles.postWrapper}>
                        <div className={styles.headWrapper}>
                            <p>{data.forum.username}</p>
                            <p>{data.forum.questionTheme}</p>
                            <div className={styles.deleteOrUpadate}>{userId === data.forum.userId || user?.isAdmin ? <div className={styles.deleteOrUpdateIcons}>
                                <MdOutlineEdit className={styles.icon} onClick={()=>handleQuestionUpdate(forumId)}/>
                                <MdDelete className={styles.icon} onClick={()=>handleQuestionDelete(forumId)}/>
                                </div> : null}</div>
                        </div>
                        <div className={styles.questionWrapper}>
                            {parse(`<p>${data.forum.question}</p>`)}
                        </div>
                        <div className={styles.likesWrapper}>
                            <div className={styles.like}>
                                <span>{data.forum.likes > 0 ? data.forum.likes : null}</span>
                            <BiLike className={styles.icon} onClick={()=>handleLike(forumId)}/>
                            </div>
                            <div className={styles.dislike}>
                                <span>{data.forum.dislikes > 0 ? data.forum.dislikes : null}</span>
                            <BiDislike className={styles.icon} onClick={()=>handleDislike(forumId)}/>
                            </div>
                            <div className={styles.solved}>
                            <IoMdCheckmarkCircle className={styles.icon} style={data.forum.isAnswered && {color:"yellow"}}/>
                            </div>
                            <div className={styles.reply}>
                            <BsFillReplyFill className={styles.icon} onClick={()=>handleReply(forumId)}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.extrasWrapper}>
                        <img src={data.forum.profilePicture !== null ? data.forum.profilePicture : '/images/placeholderprofile.jpg'} alt={data.forum.username} />
                    </div>
                </div>
                <div className={styles.answerContentWrapper}>{filteredAnswers ? filteredAnswers.map((item)=>(
                    <div className={styles.fieldWrapper} key={item.id}>
                        <div className={styles.postWrapper}>
                            <div className={styles.headWrapper}>
                                <p>{item.answererUsername ? item.answererUsername : item.sendername}</p>
                                <div className={styles.deleteOrUpadate}>{userId === item.senderId || user?.isAdmin ? <div className={styles.deleteOrUpdateIcons}>
                                <MdOutlineEdit className={styles.icon} onClick={()=>handleUpdate(item.id)}/>
                                <MdDelete className={styles.icon} onClick={()=>handleDelete(item.id)}/>
                                </div> : null}</div>
                            </div>
                            <div className={styles.answerWrapper}>
                                {parse(`<p>${item.answer}</p>`)}
                            </div>
                            <div className={styles.likesWrapper}>
                                <div className={styles.like}>
                                    <span>{item.likes > 0 ? item.likes : null}</span>
                                <BiLike className={styles.icon} onClick={()=>handleAnswerLike(item.id, item.senderId, item.likesAnswerIds, item.dislikesAnswerIds)}/>
                                </div>
                                <div className={styles.dislike}>
                                    <span>{item.dislikes > 0 ? item.dislikes : null}</span>
                                <BiDislike className={styles.icon} onClick={()=>handleAnswerDislike(item.id, item.senderId, item.dislikesAnswerIds, item.likesAnswerIds )}/>
                                </div>
                                <div className={styles.hasSolved}>
                                <IoMdCheckmarkCircle className={styles.icon} style={item.hasSolved && {color:"yellow"}} onClick={()=>handleSolved(item.id, item.questionId)}/>
                                </div>
                                <div className={styles.reply}>
                                <BsFillReplyFill className={styles.icon} onClick={()=>handleAnswerReply(item.senderId, item.sendername)}/>
                                </div>
                            </div>
                        </div> 
                        <div className={styles.extrasWrapper}>
                            <img src={item.senderProfilePicture !== null ? item.senderProfilePicture : '/images/placeholderprofile.jpg'} alt={item.sendername} />
                        </div>    
                </div>
            )):null}</div>
        </div>
    </div>
  )
}
export default SingleForumQuestion