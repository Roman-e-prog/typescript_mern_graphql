import React,{useContext, useState, useEffect} from 'react'
import styles from './home.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { LanguageContext } from '../../components/languageContext/LanguageContext'
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar'
const Home = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  },[setInnerWidth])
  
  const context = useContext(LanguageContext);
  if(context === null){
      return null;
  }
  const {language} = context;
  
  return (
    <div className={styles.container}>
      {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <img src='./images/programming.jpeg' alt="Computer with code" title="Computer with code"/>
        </div>
        <div className={styles.blogThemeWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.theme}>{language === "English" ? <h1>Learning to program for over 40</h1> : <h1>Programmieren lernen für Ü 40</h1>}</div>
          </div>
          <div className={styles.author}>{language === "English" ? <p>A Blog from Roman Armin Rostock</p> : <p>Ein Blog von Roman Armin Rostock</p>}</div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home