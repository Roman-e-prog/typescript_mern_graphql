import React, {useState, useEffect} from 'react'
import styles from './bibliothek.module.scss'
import { useQuery } from '@apollo/client';
import { GET_BIBLIOTHEKS } from '../../queries/BibliothekQueries';
import Spinner from '../../components/spinner/Spinner';
import { BibliothekDocument } from '../../../../backend/models/Bibliothek';
import { Link } from 'react-router-dom';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Navbar from '../../components/navbar/Navbar';
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar';
const Bibliothek = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  },[setInnerWidth])
  const {data, loading, error} = useQuery(GET_BIBLIOTHEKS);
  const [htmlElements, setHtmlElements] = useState<BibliothekDocument[]>([]);
  const [cssElements, setCssElements] = useState<BibliothekDocument[]>([]);
  const [javaScriptElements, setJavaScriptElements] = useState<BibliothekDocument[]>([]);
  useEffect(()=>{
    if(data && data.bibliotheks){
        setHtmlElements(data.bibliotheks.filter((item:BibliothekDocument)=>item.ressort === "HTML"))
        setCssElements(data.bibliotheks.filter((item:BibliothekDocument)=>item.ressort === "CSS"))
        setJavaScriptElements(data.bibliotheks.filter((item:BibliothekDocument)=>item.ressort === "JavaScript"));
    }
  },[data, setHtmlElements, setCssElements, setJavaScriptElements])

  //windowWidth
 const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 useEffect(()=>{
  const handleResize = ()=>setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize)
    return ()=>window.removeEventListener('resize', handleResize)
 },[setWindowWidth])

  //slideIndex SLider
  const [htmlSlideindex, setHtmlSlideindex] = useState(0)
  const [cssSlideindex, setCssSlideindex] = useState(0)
  const [javaScriptSlideindex, setJavaScriptSlideindex] = useState(0)
 
  const handleHtmlSlide = (direction:string)=>{
    if(direction === "left"){
      setHtmlSlideindex(prevState=>prevState > 0 ? prevState -1 : 0)
    } 
    else if(direction === "right" && windowWidth > 768){
      setHtmlSlideindex(prevState=>prevState < htmlElements.length - 3 ? prevState + 1 : htmlElements.length - 3)
    }
    else if(direction === "right" && windowWidth > 576){
      setHtmlSlideindex(prevState=>prevState < htmlElements.length -2 ? prevState + 1 : htmlElements.length -2)
    }
    else if(direction === "right" && windowWidth < 576){
      setHtmlSlideindex(prevState=>prevState < htmlElements.length -1 ? prevState + 1 : htmlElements.length - 1)
    }
}
  const handleCssSlide = (direction:string)=>{
    if(direction === "left"){
      setCssSlideindex(prevState=>prevState > 0 ? prevState -1 : 0)
    } 
    else if(direction === "right" && windowWidth > 768){
      setCssSlideindex(prevState=>prevState < cssElements.length - 3 ? prevState + 1 : cssElements.length - 3)
    }
    else if(direction === "right" && windowWidth > 576){
      setCssSlideindex(prevState=>prevState < cssElements.length -2 ? prevState + 1 : cssElements.length -2)
    }
    else if(direction === "right" && windowWidth < 576){
      setCssSlideindex(prevState=>prevState < cssElements.length -1 ? prevState + 1 : cssElements.length - 1)
    }
}
  const handleJavaScriptSlide = (direction:string)=>{
    if(direction === "left"){
      setJavaScriptSlideindex(prevState=>prevState > 0 ? prevState -1 : 0)
    } 
    else if(direction === "right" && windowWidth > 768){
      setJavaScriptSlideindex(prevState=>prevState < javaScriptElements.length - 3 ? prevState + 1 : javaScriptElements.length - 3)
    }
    else if(direction === "right" && windowWidth > 576){
      setJavaScriptSlideindex(prevState=>prevState < javaScriptElements.length -2 ? prevState + 1 : javaScriptElements.length -2)
    
    }
    else if(direction === "right" && windowWidth < 576){
      setJavaScriptSlideindex(prevState=>prevState < javaScriptElements.length -1 ? prevState + 1 : javaScriptElements.length - 1)
    }
}

 const one = windowWidth;
 const two = windowWidth/2;
 const three = windowWidth/3;
 //html
 const styleFull = {
  minWidth:`${three}px`,
  transform: `translateX(${htmlSlideindex * - three}px)`
 }
 const styleMiddle = {
  minWidth:`${two}px`,
  transform: `translateX(${htmlSlideindex * - two}px)`
 }
 const styleSmall = {
  minWidth:`${one}px`,
  transform: `translateX(${htmlSlideindex * - one}px)`
 }
 let style:any;

if (windowWidth > 768) {
  style = styleFull;
} else if (windowWidth > 568) {
  style = styleMiddle;
} else {
  style = styleSmall;
}
//css
 const styleCssFull = {
  minWidth:`${three}px`,
  transform: `translateX(${cssSlideindex * - three}px)`
 }
 const styleCssMiddle = {
  minWidth:`${two}px`,
  transform: `translateX(${cssSlideindex * - two}px)`
 }
 const styleCssSmall = {
  minWidth:`${one}px`,
  transform: `translateX(${cssSlideindex * - one}px)`
 }
 let cssStyle:any;

if (windowWidth > 768) {
  cssStyle = styleCssFull;
} else if (windowWidth > 568) {
  cssStyle = styleCssMiddle;
} else {
  cssStyle = styleCssSmall;
}
//javaScript
 const styleJsFull = {
  minWidth:`${three}px`,
  transform: `translateX(${javaScriptSlideindex * - three}px)`
 }
 const styleJsMiddle = {
  minWidth:`${two}px`,
  transform: `translateX(${javaScriptSlideindex * - two}px)`
 }
 const styleJsSmall = {
  minWidth:`${one}px`,
  transform: `translateX(${javaScriptSlideindex * - one}px)`
 }
 let jSStyle:any;

if (windowWidth > 768) {
  jSStyle = styleJsFull;
} else if (windowWidth > 568) {
  jSStyle = styleJsMiddle;
} else {
  jSStyle = styleJsSmall;
}
 const youtubeUrl = 'https://www.youtube.com/embed/';
 
  if(loading){
    return <Spinner/>
  }
  return (
    <div className={styles.container}>
       {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <div className={styles.theme}>
        <h2>HTML</h2>
        </div>
      <div className={styles.htmlSliderWrapper}>
      <FaArrowCircleLeft className={styles.arrowLeft} onClick={()=>handleHtmlSlide("left")}/>
        {htmlElements ? htmlElements.map((item)=>{
          const url = new URL(item.url);
          return (
          <div className={styles.fieldWrapper} key={item.id} style={style}>
            <Link to={{pathname:url.pathname, search: url.search}} className='link' id={styles.sliderLink}>
            <iframe src={youtubeUrl+item.url.split("=")[1]} title={item.videoTheme}></iframe>
            </Link>
            <h5>{item.videoTheme}</h5>
            <p className={styles.ressort}>{item.ressort}</p>
            <p>{item.videoContent}</p>
          </div>
          )
}):null}
        <FaArrowCircleRight className={styles.arrowRight} onClick={()=>handleHtmlSlide("right")}/>
      </div>
      <div className={styles.theme}>
        <h2>CSS</h2>
        </div>
      <div className={styles.cssSliderWrapper}>
      <FaArrowCircleLeft className={styles.arrowLeft} onClick={()=>handleCssSlide("left")}/>
        {cssElements ? cssElements.map((item)=>{
          const url = new URL(item.url);
          return (
          <div className={styles.fieldWrapper} key={item.id} style={cssStyle}>
            <Link to={{pathname:url.pathname, search: url.search}} className='link' id={styles.sliderLink}>
            <iframe src={youtubeUrl+item.url.split("=")[1]} title={item.videoTheme}></iframe>
            </Link>
            <h5>{item.videoTheme}</h5>
            <p className={styles.ressort}>{item.ressort}</p>
            <p>{item.videoContent}</p>
          </div>
          )
}):null}
        <FaArrowCircleRight className={styles.arrowRight} onClick={()=>handleCssSlide("right")}/>
      </div>
      <div className={styles.theme}>
        <h2>JavaScript</h2>
        </div>
      <div className={styles.javaScriptSliderWrapper}>
      <FaArrowCircleLeft className={styles.arrowLeft} onClick={()=>handleJavaScriptSlide("left")}/>
        {javaScriptElements ? javaScriptElements.map((item)=>{
          const url = new URL(item.url);
          return (
          <div className={styles.fieldWrapper} key={item.id} style={jSStyle}>
            <Link to={{pathname:url.pathname, search: url.search}} className='link' id={styles.sliderLink}>
            <iframe src={youtubeUrl+item.url.split("=")[1]} title={item.videoTheme}></iframe>
            </Link>
            <h5>{item.videoTheme}</h5>
            <p className={styles.ressort}>{item.ressort}</p>
            <p>{item.videoContent}</p>
          </div>
          )
}):null}
        <FaArrowCircleRight className={styles.arrowRight} onClick={()=>handleJavaScriptSlide("right")}/>
      </div>
    </div>
  )
}

export default Bibliothek