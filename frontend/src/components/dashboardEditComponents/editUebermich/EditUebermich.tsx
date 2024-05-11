import React from 'react'
import styles from './editUebermich.module.scss'
import {useMutation} from '@apollo/client';
import { UPDATE_UEBERMICH } from '../../../mutations/ueberMichMutations';
import { GET_UEBERMICHS} from '../../../queries/UeberMichqueries';
import {useForm} from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

type FormValues = {
    myPerson:string
}
const EditUebermich = (props:{id:any, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, editData:any}) => {
    const id = props.id;
    const setIsOpen = props.setIsOpen;
    const data = props.editData;
    const {register, handleSubmit, formState, watch} = useForm<FormValues>({
      defaultValues:{
          myPerson:data.uebermich.myPerson
      },
      mode:"onBlur"
   }) 
   const {errors, isValid, isDirty, isSubmitting} = formState;

    const [updateUebermich] = useMutation(UPDATE_UEBERMICH,{
        refetchQueries: [
          { query: GET_UEBERMICHS }
        ]
      });
      const watchMyPerson = watch('myPerson');
      console.log(watchMyPerson, 'get new Data');
     const onSubmit = async (data:FormValues)=>{
        const {myPerson} = data;
        await updateUebermich({variables:{id, myPerson}})
        .then((response)=>{
            console.log(response)
            toast.success('Beitrag erfolgreich upgedated')
            setIsOpen(false);
        }).catch((error)=>{
            console.log(error.message)
            toast.error('Update fehlgeschlagen')
        })
     }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <div className={styles.closeWrapper}>
            <span title="Schließen" onClick={()=>setIsOpen(false)}>X</span>
        </div>
        <div className={styles.formWrapper}>
         <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="editUebermichForm">
              <div className={styles.formGroup}>
              <label htmlFor="myPerson" className={styles.label}>Zu meiner Person</label>
              <textarea cols={10}
                        rows={10}
                      id="myPerson" 
                      data-testid="myPersonEdit"
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
              <button type="submit" className={styles.sendButton} disabled={!isDirty || !isValid || isSubmitting} data-testid="editUebermichSubmit">Absenden</button></div>
              </form>
        </div>
    </div>
  )
}

export default EditUebermich