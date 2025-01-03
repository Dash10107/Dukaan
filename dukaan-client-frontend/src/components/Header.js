import React, { useEffect, useState } from 'react'
import {NavLink,Link, useNavigate} from 'react-router-dom'
import {BsSearch} from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCart } from '../features/products/productSlice';
import {Typeahead} from "react-bootstrap-typeahead"
import "react-bootstrap-typeahead/css/Typeahead.css"

const Header = () => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [total,setTotal] = useState(0)
    const [length,setLength] = useState(0)
    const [paginate,setPaginate] = useState(true)
    const products = useSelector(state=>state?.product?.products);
    const [options,setOptions] = useState([]);
    useEffect(()=>{ dispatch(getCart());dispatch(getAllProducts())},[dispatch])
    useEffect(()=>{
        const options = products?.map(product=>({id:product?._id,name:product?.title}))
        setOptions(options)
    },[products])

  const cart = useSelector(state=>state?.product?.cart);





const user = JSON.parse(localStorage.getItem('user'));

const logoutFunc = ()=>{
localStorage.clear()
window.location.reload();
}

const handleClick = ()=>{
  if(user){
      navigate("/my-profile");
  }
  else{
    navigate('/login');
  }
}

useEffect(()=>{

const length = cart?.length
setLength(length)
  const total  = cart?.reduce(
  (accumulator, item) => accumulator + (item?.quantity*item?.price),0
);

setTotal(total);

},[cart])

  return (
<>
    <header className="header-top-strip py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <p className=" text-white">Free Shipping Over $100 & Free Returns</p>
          </div>
          <div className="col-6">
            <p className='text-end text-white'>
              Hotline: <a href="tel:+1234567890" className='text-white'>+123-456-7890</a>
            </p>
          </div>
        </div>
      </div>
    </header>
    <header className="header-upper py-3">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-2"><h2 ><Link className='text-white'>Digic</Link></h2></div>
          <div className="col-5">
          <div className="input-group mb-3">

  {/* <input type="text" className="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2"></input> */}
  <Typeahead
  id="basic-typeahead-single"
  labelKey="name"
  onChange={(selected) => {
    if(selected.length > 0){
      navigate(`/product/${selected[0].id}`)
    }
  }}
  options={options}
  placeholder="Search Product Here..."
  paginate={paginate}
  minLength={2}
  onPaginate={(e)=>{
    setPaginate(e)
  }}
/>
  <span className="input-group-text p-3" id="basic-addon2">
    <BsSearch className='fs-5'/>
  </span>
</div>
          </div>
          <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
         <div className=""><Link to="compareproduct" className='text-white d-flex align-items-center  gap-10'><img src="/images/compare.svg" alt=""/> <p className='mb-0'>Compare <br/> Products</p></Link></div>
         <div className=""><Link to="wishlist" className='text-white d-flex align-items-center  gap-10'><img src="/images/wishlist.svg" alt=""/><p className='mb-0'>Favourite <br/> Wishlist</p></Link></div>
         <div className="">
          <button onClick={handleClick} className='text-white d-flex bg-transparent border-0 align-items-center  gap-10'><img src="/images/user.svg" alt=""/> 
          {user ? <p className='mb-0'> Welcome  <br/> {user?.firstname }</p>:<p className='mb-0'> Log In  <br/> My Account</p> }  </button></div>
         <div className=""><Link to="/cart" className='text-white d-flex align-items-center  gap-10'><img src="/images/cart.svg" alt=""/><div className="d-flex flex-column gap-10"><span className="badge bg-white  text-dark">{length}</span><p className='mb-0'>$ {total}</p></div> </Link></div>
         </div>
          </div>
        </div>
      </div>
    </header>
    <header className="header-bottom py-3">
      <div className="container-xxl">
        <div className="row"><div className="col-12">
          <div className="menu-bottom d-flex align-items-center gap-30">
            <div >
            <div class="dropdown">
  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <img src="images/menu.svg" alt=""></img> <span className='me-5 d-inline-block'>Show Categories</span> 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><Link to="/"  className="dropdown-item text-white" href="/">Action</Link></li>
    <li><Link to="/"  className="dropdown-item text-white" href="/">Another action</Link></li>
    <li><Link to="/"  className="dropdown-item text-white" href="/">Something else here</Link></li>
  </ul>
</div>
            </div>
            <div className="menu-links">
              <div className="d-flex align-items-center gap-15">
                <NavLink  to="/">Home</NavLink>
                <NavLink  to="/product">Our Store</NavLink>
                <NavLink  to="/order">My Orders</NavLink>
                <NavLink  to="/blogs">Blogs</NavLink>
                <NavLink  to="/contact">Contact</NavLink>
                <button onClick={logoutFunc} className='btn text-white text-uppercase btn-danger'>Logout</button>
              </div>
            </div>

          </div>
          </div></div> 
      </div>
    </header>
</>
  )
}

export default Header