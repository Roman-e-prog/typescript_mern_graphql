import React,{useEffect, useContext} from 'react'
import styles from './login.module.scss';
import {useForm} from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../mutations/userMutations';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext/UserContext';
type FormValues = {
  username:string,
  email:string,
  password:string,
}
interface User{
  username:string,
  vorname:string,
  nachname:string,
  email:string,
  isAdmin:boolean,
}
const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if(!userContext){
    throw new Error('Page needs to be wrapped in UserProvider')
  }
  const {user, handleLogin} = userContext
  const [loginUser, {data, error}] = useMutation(LOGIN_USER)
 useEffect(()=>{
  if(error){
    toast.error(error?.message)
  }
  if(data) {
    handleLogin(data.loginUser);
   }
 },[handleLogin, data])

  useEffect(()=>{
    if(user){
    if(user.isAdmin){
      navigate('/dashboard')
    }
    else{
      navigate('/')
    }
  }
  },[user, navigate])

  const {register, handleSubmit, watch, formState, reset} = useForm<FormValues>({
    defaultValues:{
      username:"",
      email:"",
      password:"",
    }
  })
  const {errors, isDirty, isValid, isSubmitting, isSubmitted} = formState;

  const onSubmit = async (data:FormValues)=>{
      const {username, email, password} = data;
      try{
          await loginUser({variables:{username, email, password}})
      } catch(error:any){
        console.log(error.message)
        toast.error('Das hat nicht geklappt')
      }
  }
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.loginWrapper}>
        <div className={styles.titleWrapper}>
          <h1>Login</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="loginForm">
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
                          message:"Passwort ist ein Pflichtfeld"
                        },  
              })}/>
              <div className="errors">{errors.password?.message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.loginButton} disabled={!isDirty || !isValid || isSubmitting} data-testid="loginButton">Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login