import React, {useEffect} from 'react'
import styles from './register.module.scss'
import {useForm} from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {REGISTER_USER, UNIQUE_EMAIL, UNIQUE_USERNAME} from '../../mutations/userMutations'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {debounce} from 'lodash';
type FormValues = {
  vorname:string,
  nachname:string,
  username:string,
  email:string,
  password:string,
  passwordValidation:string,
}
const Register = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState, watch, reset} = useForm<FormValues>({
    defaultValues:{
      vorname:"",
      nachname:"",
      username:"",
      email:"",
      password:"",
      passwordValidation:"",
    },
    mode:"onBlur",
  })
  const {errors, isDirty, isValid, isSubmitting, isSubmitted} = formState;

  const [registerUser] = useMutation(REGISTER_USER)
  const [uniqueUsername] = useMutation(UNIQUE_USERNAME)
  const [uniqueEmail] = useMutation(UNIQUE_EMAIL)
 
  useEffect(()=>{
    if(isSubmitted){
      reset();
    }
  },[isSubmitted, reset])

  const onSubmit = async (data:FormValues)=>{
    const {vorname, nachname, username, email, password} = data;
    console.log(data)
    await registerUser({variables:{vorname: vorname, nachname:nachname, username:username, email:email,password: password}})
    .then((response)=>{
      navigate('/login')
    }).catch((error)=>{
      console.log(error.message)
      toast.error('Das hat nicht geklappt');
    })
  }
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.registerWrapper}>
        <div className={styles.titleWrapper}>
          <h1>Register</h1>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="vorname" className={styles.label}>Vorname</label>
              <input type="text" 
                      id="vorname" 
                      data-testid="vorname"
                      className={styles.input}
                      {...register('vorname',{
                        required:{
                          value:true,
                          message:"Vorname ist ein Pflichtfeld"
                        }
              })}/>
              <div className="errors">{errors.vorname?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nachname" className={styles.label}>Nachname</label>
              <input type="text" 
                      id="nachname" 
                      data-testid="nachname"
                      className={styles.input}
                      {...register('nachname',{
                        required:{
                          value:true,
                          message:"Nachname ist ein Pflichtfeld"
                        }
              })}/>
              <div className="errors">{errors.nachname?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input type="text" 
                      id="username" 
                      data-testid="username"
                      className={styles.input}
                      {...register('username',{
                        required:{
                          value:true,
                          message:"username ist ein Pflichtfeld"
                        },
                        validate: debounce(async (fieldValue) => {
                          const username = fieldValue;
                          const response = await uniqueUsername({ variables: { username } });
                          const data = await response.data;
                          if (data.uniqueUsername && data.uniqueUsername.username) {
                            toast.error(`Der username ${data.uniqueUsername.username} ist bereits vergeben. Bitte wählen Sie einen anderen`) 
                            return `Der username ist bereits vergeben. Bitte wählen Sie einen anderen`
                          }
                          return ""   
                      },2500)  
              })}/>
              <div className="errors">{errors.username?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" 
                      id="email" 
                      data-testid="email"
                      className={styles.input}
                      {...register('email',{
                        required:{
                          value:true,
                          message:"Email ist ein Pflichtfeld"
                        },   
                        pattern:{
                          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                          message:"Die Email ist nicht valide"
                        },
                        validate: debounce(async (fieldValue) => {
                          const email = fieldValue;
                          const response = await uniqueEmail({ variables: { email } });
                          const data = response.data;
                          if (data.uniqueEmail && data.uniqueEmail.email) {
                            toast.error(`Die Emailadresse ${data.uniqueEmail.email} ist bereits vergeben. Bitte wählen Sie eine andere`) 
                            return `Die Emailadresse ist bereits vergeben. Bitte wählen Sie eine andere`
                          }
                      }, 2500)
                      
              })}/>
              <div className="errors">{errors.email?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Passwort</label>
              <input type="password" 
                      id="password" 
                      data-testid="password"
                      className={styles.input}
                      {...register('password',{
                        required:{
                          value:true,
                          message:"password ist ein Pflichtfeld"
                        },
                        minLength:{
                          value:8,
                          message:"Das Passwort muss mindestens 8 Zeichen umfassen"
                        }
              })}/>
              <div className="errors">{errors.password?.message}</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="passwordValidation" className={styles.label}>Passwort Validieren</label>
              <input type="password" 
                      id="passwordValidation" 
                      data-testid="passwordValidation"
                      className={styles.input}
                      {...register('passwordValidation',{
                        required:{
                          value:true,
                          message:"Die Passwort Validation ist ein Pflichtfeld"
                        },
                        validate:(fieldValue)=>fieldValue === watch('password') || "Die Passwörter müssen übereinstimmen"
              })}/>
              <div className="errors">{errors.passwordValidation?.message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.registerButton} disabled={!isValid || !isDirty || isSubmitting} data-testid="registerButton">Registrieren</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register