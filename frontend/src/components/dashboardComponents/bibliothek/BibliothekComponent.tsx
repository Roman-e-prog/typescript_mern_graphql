import React,{useState} from 'react'
import styles from './bibliothek.module.scss';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../spinner/Spinner';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BIBLIOTHEK, DELETE_BIBLIOTHEK, UPDATE_BIBLIOTHEK } from '../../../mutations/bibliothekMutations';
import { GET_BIBLIOTHEK, GET_BIBLIOTHEKS } from '../../../queries/BibliothekQueries';
import {BibliothekDocument} from '../../../../../backend/models/Bibliothek';
import EditBibliothek from '../../dashboardEditComponents/editBibliothek/EditBibliothek';

type FormValues = {
    videoTheme:string,
    videoContent:string,
    url:string,
    ressort:string,
}
const BibliothekComponent = () => {
    const {register, handleSubmit, formState, reset} = useForm<FormValues>({
        defaultValues:{
            videoTheme:"",
            videoContent:"",
            url:"",
            ressort:"",
        }
    })
    const {errors, isValid, isDirty, isSubmitting, isSubmitted} = formState;
    
    const [addBibliothek] = useMutation(ADD_BIBLIOTHEK, {
        refetchQueries:[
            {
                query:GET_BIBLIOTHEKS
            }
        ]
    })
    const onSubmit = (data:FormValues)=>{
        const {videoTheme, videoContent, url, ressort} = data;
        try{
            addBibliothek({variables:{videoTheme, videoContent, url, ressort}}).then(()=>{
              toast.success('Bibliothekeintrag erfolgreich gesendet')
              reset()
            })
        } catch(error:any){
            toast.error(error.message)
        }
    }
    const [editTable, setEditTable] = useState(false)
    const [editId, setEditId] = useState(null)
    const {data:editData, loading:editLoading, error:editerror} = useQuery(GET_BIBLIOTHEK, {variables:{id:editId}})
    const handleEdit = (id:any)=>{
      setEditId(id)
      setEditTable(true);
    }
    const [deleteBibliothek] = useMutation(DELETE_BIBLIOTHEK,{
      refetchQueries:[
        {
          query:GET_BIBLIOTHEKS
        }
      ]
    })
    const handleDelete = (id:any)=>{
      deleteBibliothek({variables:{id:id}}).then(()=>{
        toast.success('Videobeitrag erfolgreich gelöscht')
      })
    }
    const {data, loading, error} = useQuery(GET_BIBLIOTHEKS);
    const youtubeUrl = "https://www.youtube.com/embed/"
    if(loading || editLoading){
        return <Spinner/>
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <h3>Bibliothek</h3>
        <div className={styles.display} data-testid="display">{data && data.bibliotheks ? data.bibliotheks.map((item:BibliothekDocument)=>(
            <div className={styles.fieldWrapper} key={item.id}>
                <div className={styles.content}>
                    <iframe src={youtubeUrl+item.url.split('=')[1]} title={item.videoTheme} data-testid="iframe"></iframe>
                    <p className={styles.ressort}>{item.ressort}</p>
                    <h5 className={styles.videoTheme}>{item.videoTheme}</h5>
                    <p className={styles.videoContent}>{item.videoContent}</p>
                </div>
                <div className={styles.updateAndDelete}>
                    <MdOutlineEdit className={styles.icon} data-testid="editBtn" onClick={()=>handleEdit(item.id)}/>
                    <MdDelete className={styles.icon} data-testid="deleteBtn" onClick={()=>handleDelete(item.id)}/>
                </div>
            </div>
        )):null}</div>
        <div className={styles.formWrapper}>
          {editTable ? <EditBibliothek editData={editData} editId={editId} setEditTable={setEditTable}/> : <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="videoTheme" className={styles.label}>Thema des Videos</label>
              <input type="text"
                      id="videoTheme" 
                      data-testid="videoTheme"
                      className={styles.input}
                      {...register('videoTheme',{
                        required:{
                          value:true,
                          message:"Das Thema des Videos muss eingegeben werden"
                        },  
              })}/>
              <div className="errors">{errors.videoTheme?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="videoContent" className={styles.label}>Inhalt des Videos</label>
              <input type="text"
                      id="videoContent" 
                      data-testid="videoContent"
                      className={styles.input}
                      {...register('videoContent',{
                        required:{
                          value:true,
                          message:"Der Inhalt des Videos muss eingegeben werden"
                        },  
              })}/>
              <div className="errors">{errors.videoContent?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="url" className={styles.label}>Url des Videos</label>
              <input type="text"
                      id="url" 
                      data-testid="url"
                      className={styles.input}
                      {...register('url',{
                        required:{
                          value:true,
                          message:"Die URL des Videos muss eingegeben werden"
                        },  
              })}/>
              <div className="errors">{errors.url?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="ressort" className={styles.label}>Themen Ressort</label>
              <input type="text"
                      id="ressort" 
                      data-testid="ressort"
                      className={styles.input}
                      {...register('ressort',{
                        required:{
                          value:true,
                          message:"Das Ressort muss eingegeben werden"
                        },  
              })}/>
              <div className="errors">{errors.ressort?.message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.sendButton} disabled={isSubmitting || !isValid || !isDirty}>Absenden</button></div>
            </form>}

        </div>
    </div>
  )
}

export default BibliothekComponent