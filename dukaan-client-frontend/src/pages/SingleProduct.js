import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from '../components/Color';
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { products } from '../utils/Data';
import {useDispatch, useSelector} from 'react-redux';
import { addProductToCompare, addToCart, addToWishlist, getAProducts, getAllProducts, rateProduct } from '../features/products/productSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SpecialProduct from '../components/SpecialProduct';
const reviewSchema = yup.object().shape({ 
  prodId: yup.string().required('Product id is required'),
  star: yup.number().required('Rating is required'),
  comment: yup.string().required('Comment is required')
})



const SingleProduct = () => {
    const navigate= useNavigate();
    const {id} = useParams();
    const [color,setColor] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [props, setProps] = useState();
    const [alreadyAdded,setAlreadyAdded] = useState(false);

    const dispatch = useDispatch();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  
    const getAProduct = ()=>{
      dispatch(getAProducts(id))
    }
    useEffect(()=>{getAProduct();dispatch(getAllProducts())},[])

    const product = useSelector(state=>state?.product?.singleProduct)
    const cart = useSelector(state=>state?.product?.cart)
    const products = useSelector(state=>state?.product?.products)

    useEffect(() => {
      if (product?.images?.length > 0) {
        setProps({
          width: 594,
          height: 600,
          zoomWidth: 600,
      
          img:
          product?.images.length > 0 ? product?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",

        });
      }
    }, [product]);

    const addToWishlistFunc = (productId) => {
      dispatch(addToWishlist(productId));  
    }
  
    const formik = useFormik({
      initialValues: {
        prodId: id,
        star: 4,
        comment: ''
      },
      validationSchema: reviewSchema,
      onSubmit: (values) => {
          dispatch(rateProduct(values))
          
      },
    });

    const addToCartFunc = ()=>{
      if(alreadyAdded === true ){
        navigate('/cart');
        return;
      }
      if(quantity=== 0 ){
        toast.warning("Please Choose Item Quantity")
        return;
      }
      if(color === ""){
        toast.warning("Please Choose Item Color")
        return;
      }
           
      const item = {
        productId:product?._id,
        quantity,
        color,
        price:product?.price
      }
      dispatch(addToCart(item));
      navigate('/cart');


    }


    const addToCompare = (e)=>{
      e.preventDefault()
      e.stopPropagation()

      dispatch(addProductToCompare(product))
      navigate("/compareproduct")
    }
  
  
    const copyToClipboard = (text) => {

      var textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    };


    useEffect(()=>{
      if(cart?.find(item=>item.productId?._id === product?._id)){
        setAlreadyAdded(true);        
      }
    }
    ,[cart,product])

    return (
      <>
        <Meta title={product?.title} />
        <BreadCrumb title={product?.title} />
        <Container class1="main-product-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  {/* <ReactImageZoom {...props} /> */}
                  <img
                    src={product?.images.length > 0 ? product?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"}
                    className="img-fluid "
       
                    alt=""
                  />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">

                {product?.images.length > 0 ? 
                            product.images.map((image,index)=>(
                              <div key={index}>
                              <img
                                src={image.url}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            ))

                            : <>
                                            <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
               </>
              
              }


</div>
</div>

            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">
                  {product?.title}
                  </h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">{product?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={product?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">( {product?.ratings?.length} Reviews )</p>
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>
                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type :</h3>
                    <p className="product-data">{product?.type}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">{product?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{product?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">{product?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availablity :</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size :</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary cursor-pointer" >
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary cursor-pointer" >
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary cursor-pointer" >
                        L
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary cursor-pointer" >
                        XL
                      </span>
                    </div>
                  </div>
                 
                    {alreadyAdded === false && (  
                       <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color :</h3>
                    <ul className="colors ps-0">
                   {product?.color && product?.color.map((color,index)=>(
                     <Color key={index} colorName={color} setColor={setColor}/>
                    ))}
                   </ul> 
                  </div>)}
     
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                     <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                      />
                    </div>
                      </>)}
                   
                    
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button
                      className='button btn'
                        onClick={addToCartFunc}
                      >
                        {alreadyAdded ? "Already Added" : "Add to Cart"}

                      </button>
                      <button className="button signup">Buy It Now</button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <button className='btn' onClick={addToCompare}>
                        <TbGitCompare className="fs-5 me-2" /> Add to Compare
                      </button>
                    </div>
                    <div  onClick={(e)=>{e.preventDefault();e.stopPropagation(); addToWishlistFunc(product?._id)}}>
                      <Link to="/wishlist" >
                        <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br /> We
                      ship all US domestic orders within
                      <b>5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Product Link:</h3>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(
                          window.location.href
                        );
                      }}
                    >
                     Copy Link
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
        <Container class1="description-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>
                      {product?.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
        <Container class1="reviews-wrapper home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={product?.totalrating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on {product?.ratings?.length} Reviews</p>
                    </div>
                  </div>
                  </div>
                  { 
    product?.ratings?.find(rating=>rating.postedby?._id === user?._id) === undefined &&        (
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form  onSubmit={formik.handleSubmit} action="" className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={formik.values.star}
                        onChange={(e) => {
                          formik.setFieldValue("star", parseInt(e));
                        }}

                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name="comment"
                        id="comment"
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        value={formik.values.comment}
                        onChange={formik.handleChange}

                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button border-0">Submit Review</button>
                    </div>
                  </form>
                </div>
                  )}
                

                <div className="reviews mt-4">
                    {
                      product?.ratings && product?.ratings.map((rating,index)=>(
                        <div key={index} className="review">
                            <h6 className="mb-0">{rating.postedby.firstname + rating.postedby.lastname}</h6>
                        <div className="d-flex align-items-center gap-10">
                      
                          <ReactStars
                            count={5}
                            size={24}
                            value={rating.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                  
                        </div>
                        <p className="mt-3">{rating.comment}</p>
                      </div>
                      ))
                     
                        
                    }
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container class1="popular-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
          {
          products?.slice(0,4).map((product)=>{
            if(product.tags === "special"){
              return <SpecialProduct product={product}  />
            }else{
              return <></>
            }
})
        }
          </div>
        </Container>
  

      </>
    );
  };
  
  export default SingleProduct;