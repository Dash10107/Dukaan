import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineArrowLeft } from "react-icons/hi";
import {useDispatch, useSelector} from 'react-redux';
import { getABlog } from '../features/blogs/blogSlice'
const SingleBlog = () => {

  const {id} = useParams();
 
  
  const dispatch = useDispatch();
  const getBlog = ()=>{
    dispatch(getABlog(id));
  }
  useEffect(()=>{getBlog()},[])
  const blogState = useSelector(state=>state?.blog?.currentBlog);
  

  const imageArray = ["/images/blog-1.jpg","/images/blog-3.webp","/images/blog-4.webp"]


  return (
    <>
    <Meta title={blogState?.title} />
    <BreadCrumb title={blogState?.title} />
    <Container class1="blog-wrapper home-wrapper-2 py-5">
      <div className="row">
        <div className="col-12">
          <div className="single-blog-card">
            <Link to="/blogs" className="d-flex align-items-center gap-10">
              <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
            </Link>
            <div className='d-flex justify-content-between'>
            <h3 className="title">{blogState?.title}</h3>
            <p className="title">{ new Date(blogState?.createdAt).toLocaleDateString()}</p >
            </div>
            <img src={ blogState?.images?.length >0 ?   blogState.images[0].url : imageArray[Math.floor(Math.random()*imageArray.length)]} className="img-fluid w-100 my-4" alt="blog" />
            <p
            dangerouslySetInnerHTML={
              {__html: blogState?.description}
            }
            >

            </p>
          </div>
        </div>
      </div>
    </Container>
  </>
  )
}

export default SingleBlog