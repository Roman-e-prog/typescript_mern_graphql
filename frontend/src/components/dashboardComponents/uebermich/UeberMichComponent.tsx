import React, { useEffect, useState } from 'react'
import styles from './uebermichComponent.module.scss'
import {useForm} from 'react-hook-form';
import { GET_UEBERMICHS, GET_UEBERMICH } from '../../../queries/UeberMichqueries';
import { ADD_UEBERMICH, DELETE_UEBERMICH} from '../../../mutations/ueberMichMutations';
import { useQuery, useMutation } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../spinner/Spinner';
import {UebermichDocument } from '../../../../../backend/models/Uebermich'
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import EditUebermich from '../../dashboardEditComponents/editUebermich/EditUebermich';
type FormValues = {
  myPerson:string
}

const UeberMichComponent = () => {
    const {register, handleSubmit, formState, reset} = useForm<FormValues>({
        defaultValues:{
            myPerson:""
        },
        mode:"onBlur"
    })
    const {errors, isValid, isDirty, isSubmitting, isSubmitted} = formState;
    //get
    const {data, loading, error} = useQuery(GET_UEBERMICHS);
    //add
    const [addUebermich] = useMutation(ADD_UEBERMICH,{
      refetchQueries: [
        { query: GET_UEBERMICHS }
      ]
    });
    //delete
    const [deleteUebermich] = useMutation(DELETE_UEBERMICH,{
      refetchQueries: [
        { query: GET_UEBERMICHS }
      ]
    });
    const onSubmit = async (data:FormValues)=>{
      const {myPerson} = data;
      await addUebermich({variables:{myPerson}})
      .then((response)=>{
        toast.success('Deine neue Personenbeschreibung wurde erfolgreich angelegt')
      }).catch((error)=>{
        console.log(error.message);
        toast.error('Das hat nicht geklappt')
      })
    }
    useEffect(()=>{
      if(isSubmitted){
        reset();
      }
    },[isSubmitted, reset]);
    //delete
    const handleDelete = (id:any)=>{
      deleteUebermich({ variables: { id } })
      .then((response)=>{
        toast.success('Deine Personenbeschreibung wurde erfolgreich gelöscht')
      }).catch((error)=>{
        console.log(error.message);
        toast.error('Das hat nicht geklappt')
      })
    }
    //update
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const {data:dataId, error:dataError} = useQuery(GET_UEBERMICH,{variables:{id:editId}});
   
    const handleUpdateData = async (id:any)=>{
      setEditId(id);
      if(dataId !== null){
          await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
          setIsOpen(true)
      }
  }
    if(loading){
      return <Spinner/>
    }
  return (
    <div className={styles.container} data-testid="ueberMichComponent">
      <ToastContainer/>
      <h3>Über mich Beitrag</h3>
        <div className={styles.ueberMichWrapper}>
            <div className={styles.display}>
              {data && data.uebermichs? data.uebermichs.map((item:any)=>(
                <div className={styles.fieldWrapper} key={item.id}>
                  <p data-testid="myPersonTag">{item.myPerson}</p>
                  <div className={styles.iconWrapper}>
                  <MdOutlineEdit className={styles.icon} onClick={()=>handleUpdateData(item.id)} data-testid="editButton"/>
                  <MdDelete className={styles.icon} onClick={()=>handleDelete(item.id)} data-testid="deleteButton"/>
                  </div>
                </div>
              )):null}
            </div>
            <div className={styles.formWrapper}>
              {isOpen ? <EditUebermich id={editId} setIsOpen={setIsOpen} editData={dataId}/> :  <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formGroup}>
              <label htmlFor="myPerson" className={styles.label}>Zu meiner Person</label>
              <textarea cols={10}
                        rows={10}
                      id="myPerson" 
                      data-testid="myPerson"
                      className={styles.input}
                      {...register('myPerson',{
                        required:{
                          value:true,
                          message:"myPerson ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.myPerson?.message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.sendButton} disabled={!isDirty || !isValid || isSubmitting}>Absenden</button></div>
              </form>}
            </div>
        </div>
    </div>
  )
}

export default UeberMichComponent