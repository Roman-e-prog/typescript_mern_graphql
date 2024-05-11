import React,{useState, useEffect} from 'react'
import styles from './blogpostComponent.module.scss';
import {useForm} from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BLOGPOST, DELETE_BLOGPOST } from '../../../mutations/blogpostMutations';
import { GET_BLOGPOST, GET_BLOGPOSTS } from '../../../queries/BlogpostQueries';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {BlogpostDocument} from '../../../../../backend/models/Blogpost';
import Spinner from '../../spinner/Spinner';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import EditBlogpost from '../../dashboardEditComponents/editBlogpost/EditBlogpost';
type FormValues = {
    blogtheme:string,
    blogdescription:string,
    blogtext:string,
    images:string[],
    author:string,
}
const BlogpostComponent = () => {
    const [addBlogpost] = useMutation(ADD_BLOGPOST,{
        refetchQueries:[
            {
                query:GET_BLOGPOSTS,
            }
        ]
    })
 
    const {register, handleSubmit, formState, reset, watch} = useForm<FormValues>({
        defaultValues:{
            blogtheme:"",
            blogdescription:"",
            blogtext:"",
            images:[],
            author:"",
        }
    })
    const {errors, isValid, isDirty, isSubmitting, isSubmitted} = formState;
  
    //preview
    // const files = watch('images');
    //update and delete
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const {data:editData, loading:editLoading, error:editerror} = useQuery(GET_BLOGPOST,{variables:{id:editId}});
    
    const handleUpdateData = (id:any)=>{
      setEditId(id);
      setEdit(true);
    }
    const [deleteBlogpost] = useMutation(DELETE_BLOGPOST,{
      refetchQueries:[{
        query:GET_BLOGPOSTS,
      }]
    })
    const handleDelete =  async (id:any)=>{
      await deleteBlogpost({variables:{id:id}}).then(()=>{
        toast.success('Beitrag erfolgreich gelöscht')
      })
    }
  
     //submit data
    const onSubmit = async (data:FormValues)=>{
      const {blogtheme, blogdescription, blogtext, author, images} = data;
      if(!images.length){
          await addBlogpost({variables:{blogtheme, blogdescription, blogtext, author}})
      } 
      else{
          const formdata = new FormData();
          const fileList = Array.from(images)
          fileList.forEach((image, i) => {
              formdata.append('images', image);
          });
          try{
              const response = await fetch('http://localhost:5000/api/upload/',{
                  method:'POST',
                  body: formdata
              });
              const responseData = await response.json();
              await addBlogpost({variables:{blogtheme, blogdescription, blogtext, author, images: responseData.images, cloudinaryIds:responseData.cloudinaryIds}}).catch((error)=>console.log(error));
          }
           catch(error:any){
              console.log(error);
              toast.error(error.message);
          }
      }
    }
    useEffect(()=>{
      if(isSubmitted){
        reset();
      }
    },[isSubmitted, reset]);
     //get
   const { data,loading} = useQuery(GET_BLOGPOSTS);
   
    if(loading){
      return <Spinner/>
    }
    if(editLoading){
      return <Spinner/>
    }
  return (
    <div className={styles.container}>
      <ToastContainer/>
        <h3>Blogbeiträge</h3>
        <div className={styles.display}>
          {data.blogposts ? data.blogposts.map((item:BlogpostDocument)=>(
            <div className={styles.itemWrapper} key={item.id}>
              <div className={styles.imageWrapper}>
                {item.images ? item.images.map((item, index)=>(
                  <img src={item} alt={`Bild Nr. ${index + 1}`} title={`Bild Nr. ${index + 1}`} key={index}/>
                )):null}
              </div>
              <div className={styles.contentWrapper}>
                <h3>{item.blogtheme}</h3>
                <p data-testid="testField">{item.blogdescription}</p>
                <p>{item.blogtext}</p>
                <p className={styles.author}>{item.author}</p>
              </div>
              <div className={styles.iconWrapper}>
                  <MdOutlineEdit className={styles.icon} onClick={()=>handleUpdateData(item.id)} data-testid="editBtn" />
                  <MdDelete className={styles.icon} onClick={()=>handleDelete(item.id)} data-testid="deleteBtn"/>
                  </div>
            </div>
          )):null}
        </div>
        <div className={styles.formWrapper}>
          {edit ? <EditBlogpost editId={editId} setEdit={setEdit} data={editData}/> : <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="blogtheme" className={styles.label}>Blog Thema</label>
              <input type="text"
                      id="blogtheme" 
                      data-testid="blogtheme"
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
                      data-testid="blogdescription"
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
                      data-testid="blogtext"
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
                      data-testid="author"
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
              <input type="file"
                      id="images" 
                      data-testid="images"
                      className={styles.input}
                      multiple
                      {...register('images')}
                    />
              <div className="errors">{errors.images?.message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.sendButton} disabled={isSubmitting} data-testid="blogpostAddBtn">Absenden</button></div>
            </form>}
        </div>
    </div>
  )
}

export default BlogpostComponent