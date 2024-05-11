import React,{useState} from 'react'
import styles from './forumThemes.module.scss';
import {useForm} from 'react-hook-form';
import Spinner from '../../spinner/Spinner';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FORUMTHEME, DELETE_FORUMTHEME } from '../../../mutations/forumThemeMutations';
import { GET_FORUMTHEME, GET_FORUMTHEMES } from '../../../queries/ForumThemeQueries';
import {ForumThemeDocument} from '../../../../../backend/models/ForumTheme';
import EditForumTheme from '../../dashboardEditComponents/forumThemesEdit/EditForumTheme';
type FormValues = {
    forumtheme:string,
    forumressort:string,
    forumcontent:string,
}
const ForumThemes = () => {
    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues:{
            forumtheme:"",
            forumressort:"",
            forumcontent:"",
        }
    })
    const {errors, isValid, isDirty, isSubmitting, isSubmitted} = formState;

    const {data, loading, error} = useQuery(GET_FORUMTHEMES);
  
    const [addForumTheme] = useMutation(ADD_FORUMTHEME,{
        refetchQueries:[
            {
                query:GET_FORUMTHEMES
            }
        ]
    })
    const [deleteForumTheme] = useMutation(DELETE_FORUMTHEME,{
        refetchQueries:[
            {
                query:GET_FORUMTHEMES
            }
        ]
    })
    const onSubmit = (data:FormValues)=>{
        const {forumtheme, forumressort, forumcontent} = data;
        addForumTheme({variables:{forumtheme, forumressort, forumcontent}})
    }
    // update and delete
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const {data:editData, loading:editLoading, error:editError} = useQuery(GET_FORUMTHEME, {variables:{id:editId}})
  
    const handleUpdate = (id:any)=>{
        setEditId(id);
        setEdit(true);
    }
    const handleDelete = (id:any)=>{
      deleteForumTheme({variables:{id}})
      toast.success('Forumthema wurde gelöscht')
    }
    if(loading){
        return <Spinner/>
    }
    if(editLoading){
        return <Spinner/>
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <h3>Forumthemen</h3>
        <div className={styles.display}>{data.forumThemes ? data.forumThemes.map((item:ForumThemeDocument)=>(
            <div className={styles.fieldWrapper} key={item.id}>
              <div className={styles.contentWrapper}>
                  <h3>{item.forumtheme}</h3>
                  <p>{item.forumressort}</p>
                  <p>{item.forumcontent}</p>
                </div>
                <div className={styles.iconWrapper}>
                  <MdOutlineEdit className={styles.icon} onClick={()=>handleUpdate(item.id)} data-testid="editBtn"/>
                  <MdDelete className={styles.icon} onClick={()=>handleDelete(item.id)} data-testid="deleteBtn"/>
                </div>
            </div>
        )):null}</div>
        <div className={styles.formWrapper}>
          {edit ? <EditForumTheme id={editId} editData={editData} setEdit={setEdit}/> :             
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="forumtheme" className={styles.label}>Forum Thema</label>
              <input type="text"
                      id="forumtheme" 
                      data-testid="forumtheme"
                      className={styles.input}
                      {...register('forumtheme',{
                        required:{
                          value:true,
                          message:"Das Forum Thema ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.forumtheme?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="forumressort" className={styles.label}>Forum Ressort</label>
              <input type="text"
                      id="forumressort" 
                      data-testid="forumressort"
                      className={styles.input}
                      {...register('forumressort',{
                        required:{
                          value:true,
                          message:"Das Forum Ressort ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.forumressort?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="forumcontent" className={styles.label}>Forum Inhalt</label>
              <textarea cols={10}
                        rows={10}
                      id="forumcontent" 
                      data-testid="forumcontent"
                      className={styles.input}
                      {...register('forumcontent',{
                        required:{
                          value:true,
                          message:"Der Forum Inhalt ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.forumcontent?.message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.sendButton} disabled={!isDirty || !isValid || isSubmitting}>Absenden</button></div>
            </form>}
        </div>
    </div>
  )
}

export default ForumThemes