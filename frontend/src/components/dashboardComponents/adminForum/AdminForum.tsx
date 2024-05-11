import React,{useContext} from 'react'
import styles from './adminForum.module.scss';
import { useMutation } from '@apollo/client';
import { UserContext } from '../../../userContext/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ADD_FORUM } from '../../../mutations/forumMutations';
type FormValues = {
    questionTheme:string,
    question:string,
    ressort:string,
}
const AdminForum = () => {
    const userContext = useContext(UserContext);
    if(!userContext){
        toast.error('Schau mal nach, da stimmt was mit dem UserContext nicht')
        throw new Error('Da ist was schiefgelaufen');
    }
    const {user} = userContext;
    const userId = user?.id;
    const username = user?.username;
    const userIsAdmin = user?.isAdmin;
    const profilePicture = user?.profilePicture;
    const {register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues:{
            questionTheme:"",
            question:"",
            ressort:"",
        },
        mode:"onBlur",
    })
    const {errors, isDirty, isValid, isSubmitting} = formState;
    const [addForum] = useMutation(ADD_FORUM)
    const onSubmit = (data:FormValues)=>{
        const {ressort, questionTheme, question} = data;
        try{
            addForum({variables:{username, userId, ressort, questionTheme, question, userIsAdmin, profilePicture}})
        } catch(error:any){
            toast.error(error.message)
        }
    }
  return (
    <div className={styles.container}>
        <ToastContainer/>
        <h3>Meine Adminbeiträge</h3>
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label htmlFor="ressort" className={styles.label}>Ressort</label>
                    <input type="text"
                            id="ressort"
                            className={styles.input}
                            data-testid="ressort"
                            {...register('ressort',{
                                required:{
                                    value:true,
                                    message:"Du musst das Ressort eingeben"
                                }
                            })} />
                        <div className="errors">{errors?.ressort?.message}</div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="questionTheme" className={styles.label}>Thema meines Beitrags</label>
                    <input type="text"
                            id="questionTheme"
                            className={styles.input}
                            data-testid="questionTheme"
                            {...register('questionTheme',{
                                required:{
                                    value:true,
                                    message:"Du musst das Thema eingeben"
                                }
                            })} />
                        <div className="errors">{errors?.questionTheme?.message}</div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="question" className={styles.label}>Inhalt meines Beitrags</label>
                    <textarea cols={10}
                            rows={10}
                            id="question"
                            className={styles.input}
                            data-testid="question"
                            {...register('question',{
                                required:{
                                    value:true,
                                    message:"Du musst deine Ansage eingeben"
                                }
                            })} />
                        <div className="errors">{errors?.question?.message}</div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.sendBtn} disabled={!isDirty || !isValid || isSubmitting}>Absenden</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AdminForum