import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import ReactStars from "react-rating-stars-component";
import Color from '../components/Color';

import {useDispatch, useSelector} from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';


const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [limit, setLimit] = useState();
  const [page, setPage] = useState(1);
  // const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [color, setColor] = useState('');
  const [tag, setTag] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false); 
  const dispatch = useDispatch();

  const getProducts = ()=>{
    dispatch(getAllProducts({limit:"6",page:"1"}));
  }
useEffect(()=>{getProducts(); },[])
const productState = useSelector(state=>state?.product?.products);

useEffect(() => {
  if (total === 0 && productState.length > 0) {
    setTotal(productState.length);
  }
}, [productState, total]);

useEffect(()=>{
  if (!isInitialized && productState.length > 0) {
  const brands = new Set();
  const categories = new Set();
  const tags = new Set();
  const colors = new Set();
  
  productState.forEach(item => {
    if (item?.brand) brands.add(item.brand);
    if (item?.category) categories.add(item.category);
    if (item?.tags) tags.add(item.tags);
    if (item?.color) item.color.forEach(c => colors.add(c));
    
  });
  
  setBrands([...brands]);
  setCategories([...categories]);
  setTags([...tags]);
  setColors([...colors]);
      setIsInitialized(true); // Mark as initialized
    }
  }, [productState, isInitialized]);



useEffect(() => {
  dispatch(getAllProducts({ brand, category, tag, minPrice, maxPrice, sort, page, limit }));
}, [page, limit, sort, brand, category, tag, minPrice, maxPrice, color,dispatch]);





  return (
<>
<Meta title={"Our Store"} />
<BreadCrumb title="Our Store" />
<Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {
                    categories.map((item,index)=>{
                      return (
                        <li
                          key={index}
                          className={`cursor-pointer text-capitalize relative px-4 py-2 rounded ${
                            category === item ? 'highlight' : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCategory(item);
                          }}
                        >
                          {item}
                          {category === item && (
                            <span
                              className="top-0 right-0 px-2 py-1 text-sm cursor-pointer text-white rounded-full "
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                setCategory('');
                              }}
                            >
                              &times;
                            </span>
                          )}
                        </li>
                      );
                      
                    }
                    )
                  }
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      value={minPrice}
                      onChange={(e)=>{setMinPrice(e.target.value)}}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      value={maxPrice}
                      onChange={(e)=>{setMaxPrice(e.target.value)}}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <ul className="d-flex flex-wrap gap-10 colors">
                    {
                      colors.map((item,index)=>{
                        return <Color key={index} colorName={item} setColor={setColor}/>
                      })
                    }
                    </ul>
                </div>

                    <h5 className="sub-title">Brands</h5>
                  <div className="filter-card mb-3">      
              
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {
                    brands?.map((item,index)=>{
                      return <span key={index} 
                      className={`badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer ${
                        brand === item ? 'bg-dark text-white' : ''
                      }`}
                       
                      onClick={
                        (e)=>{
                          e.preventDefault();
                          setBrand(item);
                      }}
                      >{item}
                                                {brand === item && (
                            <span
                              className="top-0 right-0 px-2 py-1 text-sm cursor-pointer text-white rounded-full "
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                setBrand('');
                              }}
                            >
                              &times;
                            </span>
                          )}
                      </span>
                    }
                    )
                  }
              </div>
            </div>
            <button className="btn button w-100" 
            onClick={()=>{          
               dispatch(getAllProducts({brand,category,tag,minPrice,maxPrice,sort,page,limit}));  
            } }
            >Filter</button>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {
                    tags.map((item,index)=>{
                      return <span key={index} 
                      className={`badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer ${
                        tag === item ? 'bg-dark text-white' : ''
                      }`}

                      onClick={
                        ()=>{
                          setTag(item);
                      }}
                      >{item}
                      {tag === item && (
                            <span
                              className="px-2 py-1 text-sm cursor-pointer text-white rounded-full "
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                setTag('');
                              }}
                            >
                              &times;
                            </span>
                          )}
                      </span>
                    }
                    )
                  }
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                <div className="random-products mb-3 d-flex" >
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e)=>{
                      setSort(e.target.value);
                    }}
                    value={sort}
                  >
                    {/* <option value="manual">Featured</option> */}
                    {/* <option value="best-selling">Best selling</option> */}
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{total} Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                        setLimit(8);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                        setLimit(6);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                        setLimit(4);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                        setLimit(2);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {productState.map((item,index)=>{
                  
                return(<ProductCard grid={grid} key={index} product={item} />)
})}
 
              </div>
             
            </div>
            <ResponsivePagination
  current={page}
  // total={ limit ? Math.ceil(productState?.length * limit ) : productState?.length} // Calculate the total pages
total={total}
onPageChange={(newPage) => setPage(newPage)}
/>

          </div>
        </div>
      </Container>

</>
  )
}

export default OurStore