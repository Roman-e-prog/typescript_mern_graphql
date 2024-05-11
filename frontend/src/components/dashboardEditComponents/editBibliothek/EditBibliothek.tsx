import React from 'react'
import styles from './editBibliothek.module.scss';
import {useForm} from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_BIBLIOTHEK } from '../../../mutations/bibliothekMutations';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { GET_BIBLIOTHEKS } from '../../../queries/BibliothekQueries';

type FormValues = {
    videoTheme:string,
    videoContent:string,
    url:string,
    ressort:string
}
const EditBibliothek = (props:{editData:any, editId:any, setEditTable: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const editData = props.editData;
    const editId = props.editId;
    const setEditTable = props.setEditTable;
    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues:{
            videoTheme: editData.bibliothek.videoTheme,
            videoContent: editData.bibliothek.videoContent,
            url: editData.bibliothek.url,
            ressort: editData.bibliothek.ressort,
        }
    })
    const {errors, isSubmitting} = formState;
    const [updateBibliothek] = useMutation(UPDATE_BIBLIOTHEK, {
        refetchQueries:[
            {
                query:GET_BIBLIOTHEKS
            }
        ]
    })
    const onSubmit = (data:FormValues)=>{
        const {videoTheme, videoContent, url, ressort} = data;
        try{
            updateBibliothek({variables:{id: editId, videoTheme:videoTheme, videoContent:videoContent, url:url, ressort:ressort}}).then(()=>{
                toast.success('Update erfolgreich');
                setEditTable(false)
            })

        } catch(error:any){
            toast.error(error.message)
        }
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <h3>Update Bibliothek</h3>
        <div className={styles.closeWrapper}>
            <span className={styles.close}  onClick={()=>setEditTable(false)} title="Schließen">X</span>
        </div>
        <div className={styles.formWrapper}>
            <form className={styles.form} data-testid="editBibliothekForm" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label htmlFor="videoTheme" className={styles.label}>Thema</label>
                    <input type="text" 
                            className={styles.input}
                            data-testid="videoThemeEdit"
                            id="videoTheme"
                            {...register('videoTheme',{
                                required:{
                                    value:true,
                                    message:"Ein Thema muss gesetzt werden"
                                }
                            })} />
                        <div className="errors">{errors.videoTheme?.message}</div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="videoContent" className={styles.label}>video Inhalt</label>
                    <input type="text" 
                            className={styles.input}
                            data-testid="videoContentEdit"
                            id="videoContent"
                            {...register('videoContent',{
                                required:{
                                    value:true,
                                    message:"Ein Inhalt muss gesetzt werden"
                                }
                            })} />
                        <div className="errors">{errors.videoContent?.message}</div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="url" className={styles.label}>Video Url</label>
                    <input type="text" 
                            className={styles.input}
                            data-testid="urlEdit"
                            id="url"
                            {...register('url',{
                                required:{
                                    value:true,
                                    message:"Eine Video Url muss gesetzt werden"
                                }
                            })} />
                        <div className="errors">{errors.url?.message}</div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ressort" className={styles.label}>Ressort</label>
                    <input type="text" 
                            className={styles.input}
                            data-testid="ressortEdit"
                            id="ressort"
                            {...register('ressort',{
                                required:{
                                    value:true,
                                    message:"Ein Thema muss gesetzt werden"
                                }
                            })} />
                        <div className="errors">{errors.ressort?.message}</div>
                </div>
                <button className="styles sendButton" type="submit" data-testid="bibliothekEditSend" disabled={isSubmitting}>Absenden</button>
            </form>
        </div>
    </div>
  )
}

export default EditBibliothek