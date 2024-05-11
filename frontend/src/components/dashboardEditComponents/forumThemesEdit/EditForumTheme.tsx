import React from 'react'
import styles from './editForumTheme.module.scss';
import { ForumThemeDocument } from '../../../../../backend/models/ForumTheme'
import {useForm} from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_FORUMTHEME } from '../../../mutations/forumThemeMutations';
import { GET_BLOGPOSTS } from '../../../queries/BlogpostQueries';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
type FormValues = {
  forumtheme:string,
  forumressort:string,
  forumcontent:string,
}
const EditForumTheme = (props:{id:any, setEdit:React.Dispatch<React.SetStateAction<boolean>>, editData:any}) => {
  const data = props.editData;
  const id = props.id;
  const setEdit = props.setEdit;
  const {register, handleSubmit, formState} = useForm<FormValues>({
    defaultValues:{
      forumtheme:data.forumTheme.forumtheme,
      forumressort:data.forumTheme.forumressort,
      forumcontent:data.forumTheme.forumcontent,
    },
    mode:'onBlur',
  })
  const {errors, isValid, isDirty, isSubmitting, isSubmitted} = formState;

  const [updateForumThemes] = useMutation(UPDATE_FORUMTHEME,{
    refetchQueries:[
      {
        query:GET_BLOGPOSTS
      }
    ]
  })
  const onSubmit = async (data:FormValues)=>{
    const {forumtheme, forumressort, forumcontent} = data;
    try{
        await updateForumThemes({variables:{id:id, forumtheme, forumressort, forumcontent}}).then(()=>{
          toast.success('Update erfolgreich')
          setEdit(false)
        });
    } catch(error:any){
      console.log(error.message);
      toast.error('Update fehlgeschlagen');
    }
  }
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.closeWrapper}>
            <span title="Schließen" onClick={()=>setEdit(false)}>X</span>
        </div>
      <div className={styles.fromWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="forumThemesEditForm">
            <div className={styles.formGroup}>
              <label htmlFor="forumtheme" className={styles.label}>Forum Thema</label>
              <input type="text"
                      id="forumtheme" 
                      data-testid="forumthemeEdit"
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
                      data-testid="forumressortEdit"
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
                      data-testid="forumcontentEdit"
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
              <button type="submit" className={styles.sendButton} disabled={!isDirty || !isValid || isSubmitting} data-testid="editForumthemeSubmit">Absenden</button></div>
            </form>
      </div>
    </div>
  )
}

export default EditForumTheme