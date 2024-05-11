import React,{useContext, useEffect, useState} from 'react'
import styles from './ueberMich.module.scss'
import { LanguageContext } from '../../components/languageContext/LanguageContext';
import { useQuery } from '@apollo/client';
import { GET_UEBERMICHS } from '../../queries/UeberMichqueries';
import { UebermichDocument } from '../../../../backend/models/Uebermich';
import Spinner from '../../components/spinner/Spinner';
import Navbar from '../../components/navbar/Navbar';
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar';
const Uebermich = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  },[setInnerWidth])
  const context = useContext(LanguageContext);
  const {data, loading,} = useQuery(GET_UEBERMICHS);

  if(context === null){
    return null
  }
  const {language} = context;
  if(loading){
    return <Spinner/>
  }
  return (
    <div className={styles.container}>
       {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <div className={styles.contentWrapper}>{data && data.uebermichs ? data.uebermichs.map((item:UebermichDocument)=>(
        <div className={styles.fieldWrapper} key={item.id}>
         <p>{item.myPerson}</p>
        </div>
      )):null}</div>
    </div>
  )
}

export default Uebermich