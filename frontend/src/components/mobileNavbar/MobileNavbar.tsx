import React, {useContext, useState} from 'react'
import styles from './mobileNavbar.module.scss';
import navlinksDeutsch from '../../jsons/navlinksDeutsch.json'
import navlinksEnglish from '../../jsons/navlinksEnglish.json'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../languageContext/LanguageContext'
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { UserContext } from '../../userContext/UserContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
const MobileNavbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const handleNav = ()=>{
        if(navOpen){
            setNavOpen(false)
        }
        else{
            setNavOpen(true)
        }
    }
    //user
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("Navbar must be used within a UserProvider");
      }
      const {user, handleLogout} = userContext;
      //language
    const context = useContext(LanguageContext);
    if(context === null){
        return null;
    }
    const {language, toggle} = context;
    const navlinks = language === "English" ? navlinksEnglish : navlinksDeutsch;

  return (
    <div className={styles.container} data-testid="navbar">
        <div className={styles.logo}>
            <Link to="/"><img src="/images/roman.jpg" alt="Roman" title="back to homepage" /></Link>
        </div>
        <div className={styles.navWrapper}>
            <div className={styles.top}>
                <select className={styles.selectLanguage} onChange={toggle}>
                    <option>Deutsch</option>
                    <option>English</option>
                </select>
            </div>
            <nav className={styles.navbar}>
            <GiHamburgerMenu className={styles.hamburger} onClick={handleNav}/>
            {navOpen ? <div className={styles.navBarWrapper}>
            <ul className={styles.linkList}>
                    {navlinks ? navlinks.map((item)=>(
                        <li key={item.id} className={styles.navItem}><Link to={item.link} className='link'>{item.name}</Link></li>
                    )):null}
                </ul>
            </div> : null}
                <ul className={styles.loginLogout}>
                <li>{user ? <IoMdLogOut onClick={handleLogout} className={styles.logBtn} title="Logout"/> : <Link to="/login" className='link'><IoMdLogIn className={styles.logBtn} title="Login"/></Link>}</li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default MobileNavbar