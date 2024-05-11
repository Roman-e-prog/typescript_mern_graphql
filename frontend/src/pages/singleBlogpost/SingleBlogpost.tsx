import React,{useEffect, useState} from 'react'
import styles from './singleBlogpost.module.scss';
import { useQuery } from '@apollo/client';
import { GET_BLOGPOST } from '../../queries/BlogpostQueries';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import Navbar from '../../components/navbar/Navbar';
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar';
const SingleBlogpost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  },[setInnerWidth])
  const {data, loading, error} = useQuery(GET_BLOGPOST,{variables:{id:id}});
  if(loading){
    return <Spinner/>
  }
  return (
    <div className={styles.container}>
       {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <div className={styles.contentWrapper}>
        <div className={styles.headWrapper}>
          <div className={styles.intro}>
            <h1>{data.blogpost.blogtheme}</h1>
            <p>{data.blogpost.blogdescription}</p>
            <p className={styles.author}>{data.blogpost.author}</p>
          </div>
          <div className={styles.image}>
           {data.blogpost.images.length ? <img src={data.blogpost.images ? data.blogpost.images[0] : ""} alt={data.blogpost.blogtheme} title={data.blogpost.blogtheme}/> : null}
          </div>
        </div>
        <div className={styles.back}>
            <span role='button' onClick={()=>navigate(-1)}>Zurück</span>
          </div>
        <hr className={styles.line}/>
        <div className={styles.textWrapper}>
          <p>{data.blogpost.blogtext}</p>
          <div className={styles.imageWrapper}>
         {data.blogpost.images[1] ? <img src={data.blogpost.images[1] ? data.blogpost.images[1] : ""} alt={data.blogpost.images[1] ? data.blogpost.blogtheme: null} title={data.blogpost.images[1] ? data.blogpost.blogtheme: null}/> : null}
       {data.blogpost.images[2] ? <img src={data.blogpost.images[2] ? data.blogpost.images[2] : ""} alt={data.blogpost.images[2] ? data.blogpost.blogtheme : null} title={data.blogpost.images[2] ? data.blogpost.blogtheme : null}/> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogpost