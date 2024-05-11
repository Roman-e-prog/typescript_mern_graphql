import React, { useState } from 'react'
import styles from './editAdminAnswer.module.scss'
import { useMutation } from '@apollo/client';
import { UPDATE_ADMINANSWER } from '../../../mutations/adminAnswerMutations';
import { GET_ADMINANSWERS } from '../../../queries/AdminAnswerQuery';
const EditAdminAnswer = (props:{editId:any, setEditOpen:React.Dispatch<React.SetStateAction<boolean>>, editAnswerData:any}) => {
    const id = props.editId;
    const setEditOpen = props.setEditOpen;
    const data = props.editAnswerData;
    const [editValue, setEditValue] = useState({
        adminAnswer:data.adminAnswer.adminAnswer,
    })
    const {adminAnswer} = editValue;
    const [updateAdminAnswer] = useMutation(UPDATE_ADMINANSWER,{
        refetchQueries:[
            {
                query:GET_ADMINANSWERS
            }
        ]
    })
    const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        updateAdminAnswer({variables:{id:id, adminAnswer:adminAnswer}})
    }
  return (
    <div className={styles.container}>
        <div className={styles.closeWrapper}>
            <span title="Schließen" onClick={()=>{setEditOpen(false)}}>X</span>
        </div>
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.answerMessage}>
                    <label htmlFor="adminAnswer">Meine Antwort: </label>
                    <textarea name="adminAnswer" 
                                id="adminAnswer" 
                                cols={10} 
                                rows={10}
                                defaultValue={adminAnswer}
                                onChange={(e)=>setEditValue({...editValue, adminAnswer:e.target.value})}></textarea>
                </div>
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.sendBtn}>Absenden</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditAdminAnswer