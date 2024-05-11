import React,{useEffect, useState} from 'react'
import styles from './blog.module.scss';
import { useQuery } from '@apollo/client';
import { GET_BLOGPOSTS } from '../../queries/BlogpostQueries';
import Spinner from '../../components/spinner/Spinner';
import { BlogpostDocument } from '../../../../backend/models/Blogpost';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import MobileNavbar from '../../components/mobileNavbar/MobileNavbar';
const Blog = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return ()=>window.removeEventListener('resize', handleResize)
  },[setInnerWidth])
  const {data, loading, error} = useQuery(GET_BLOGPOSTS);
  if(loading){
    return <Spinner/>
  }
  return (
    <div className={styles.container}>
        {innerWidth < 568 ? <MobileNavbar/> :  <Navbar/>}
      <div className={styles.contentWrapper}>
        {data.blogposts ? data.blogposts.map((item:BlogpostDocument)=>(
          <Link to={{pathname:`/blogpost/${item.id}`}} key={item.id} className='link' id={styles.blogLink}>
            <div className={styles.fieldWrapper} key={item.id}>
              <div className={styles.texts}>
                <h3>{item.blogtheme}</h3>
                <p>{item.blogdescription}</p>
                <p className={styles.author}>Von {item.author}</p>
              </div>
              <div className={styles.images}>
                {item.images ? item.images.map((item:string, index:number)=>(
                  <img src={item} alt={`Bild Nr. ${index + 1}`} key={index} title={`Bild Nr. ${index + 1}`}/>
                )):null}
              </div>
            </div>
          </Link>
        )):null}
      </div>
    </div>
  )
}

export default Blog