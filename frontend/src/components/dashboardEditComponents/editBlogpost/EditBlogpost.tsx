import React, { useState } from 'react'
import styles from './editBlogpost.module.scss'
import { BlogpostDocument } from '../../../../../backend/models/Blogpost'
import {useForm} from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_BLOGPOST } from '../../../mutations/blogpostMutations';
import { GET_BLOGPOSTS } from '../../../queries/BlogpostQueries';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

type FormValues = {
    blogtheme:string,
    blogdescription:string,
    blogtext:string,
    images:string[],
    author:string,
}
const EditBlogpost = (props:{editId:any, setEdit:React.Dispatch<React.SetStateAction<boolean>>, data:any}) => {
    const data:any = props.data;
    const id = props.editId;
    const setEdit = props.setEdit;
    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues:{
            blogtheme:data.blogpost.blogtheme,
            blogdescription:data.blogpost.blogdescription,
            blogtext:data.blogpost.blogtext,
            author:data.blogpost.author,
        }
    })
    const {errors, isValid, isDirty, isSubmitting, isSubmitted} = formState;
    const [filedata, setFiledata] = useState<{images:(string | File)[]}>({
        images:data!.blogpost.images,
   })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, index:number)=>{
        const file = e.target.files ? e.target.files[0]: null
        const newImages = [...filedata.images];
        if(!file){
            return
        }
        newImages[index] = file
        setFiledata((prevState)=>({
            ...prevState,
            images:newImages
        }))
    }
    const [updateBlogpost] = useMutation(UPDATE_BLOGPOST,{
        refetchQueries:[
            {
                query:GET_BLOGPOSTS,
            }
        ]
    });
    const onSubmit = async (data:FormValues)=>{
        const {blogtheme, blogdescription, blogtext, author} = data;
        if(!filedata.images.length && filedata.images.every((item)=> typeof item !== 'string')){
            updateBlogpost({variables:{blogtheme, blogdescription, blogtext, author}}).then(()=>{
              setEdit(false)
            })
        } else{
            const formdata = new FormData();
            filedata.images.forEach((image, index)=>{
              if(image instanceof File){
                formdata.append( 'images', image)
                formdata.append(`imageIndex[${index}]`, String(index));
              }  
            })
            try{
                const response = await fetch(`http://localhost:5000/api/upload/${id}`,{
                    method:'PUT',
                    body:formdata
                })
                const responseData = await response.json();
                console.log(responseData, 'here responseData')
                updateBlogpost({variables:{id: id, blogtheme, blogdescription, blogtext, author, images:responseData.images, cloudinaryIds:responseData.cloudinaryIds}}).then(()=>{
                  setEdit(false)
                })

            } catch(error){
                console.log(error)
                toast.error('Das update ist leider fehlgeschlagen')
            }
        }
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <div className={styles.closeWrapper}>
            <span title="Schließen" onClick={()=>setEdit(false)}>X</span>
        </div>
        <div className={styles.fromWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="editForm">
            <div className={styles.formGroup}>
              <label htmlFor="blogtheme" className={styles.label}>Blog Thema</label>
              <input type="text"
                      id="blogtheme" 
                      data-testid="blogthemeEdit"
                      className={styles.input}
                      {...register('blogtheme',{
                        required:{
                          value:true,
                          message:"Der Blog Text ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.blogtheme?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="blogdescription" className={styles.label}>Blog Beschreibung</label>
              <textarea cols={10}
                        rows={10}
                      id="blogdescription" 
                      data-testid="blogdescriptionEdit"
                      className={styles.input}
                      {...register('blogdescription',{
                        required:{
                          value:true,
                          message:"Die Beschreibung ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.blogdescription?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="blogtext" className={styles.label}>Blog Text</label>
              <textarea cols={10}
                        rows={10}
                      id="blogtext" 
                      data-testid="blogtextEdit"
                      className={styles.input}
                      {...register('blogtext',{
                        required:{
                          value:true,
                          message:"Der Blog Text ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.blogtext?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="author" className={styles.label}>Author</label>
              <input type="text"
                      id="author" 
                      data-testid="authorEdit"
                      className={styles.input}
                      {...register('author',{
                        required:{
                          value:true,
                          message:"Autor ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.author?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="images" className={styles.label}>Blog Images</label>
              {data.blogpost.images ? data.blogpost.images.map((item:any, index:number)=>(
                 <input type="file"
                 id="images" 
                 name="images"
                 data-testid="imagesEdit"
                 className={styles.input}
                 onChange={(e)=>handleChange(e, index)}
                 key={index}
               />
              )):null}
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.sendButton} data-testid="editSendBtn">Absenden</button></div>
            </form>
        </div>
    </div>
  )
}

export default EditBlogpost