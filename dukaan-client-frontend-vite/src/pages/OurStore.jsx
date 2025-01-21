import React, { useEffect, useState } from "react"
import Meta from "../components/Meta"
import BreadCrumb from "../components/BreadCrumb"
import ProductCard from "../components/ProductCard"
import Container from "../components/Container"
import ReactStars from "react-rating-stars-component"
import Color from "../components/Color"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts, elasticSearchProducts } from "../features/products/productSlice"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"

const OurStore = () => {
  const [grid, setGrid] = useState(4)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [colors, setColors] = useState([])
  const [limit, setLimit] = useState()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [color, setColor] = useState("")
  const [tag, setTag] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [total, setTotal] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)

  const dispatch = useDispatch()

  const { products, isError, message } = useSelector((state) => state.product)

  const getProducts = () => {
    dispatch(getAllProducts({ limit: "6", page: "1" }))
  }
  useEffect(() => {
    getProducts()
  }, [])
  const productState = useSelector((state) => state?.product)
  const { isLoading, isSearching } = productState

  useEffect(() => {
    if (total === 0 && productState?.products?.length > 0) {
      setTotal(productState?.products?.length)
    }
  }, [productState, total])

  useEffect(() => {
    if (!isInitialized && productState?.products?.length > 0) {
      const brands = new Set()
      const categories = new Set()
      const tags = new Set()
      const colors = new Set()

      productState.products.forEach((item) => {
        if (item?.brand) brands.add(item.brand)
        if (item?.category) categories.add(item.category)
        if (item?.tags) tags.add(item.tags)
        if (item?.color) item.color.forEach((c) => colors.add(c))
      })

      setBrands([...brands])
      setCategories([...categories])
      setTags([...tags])
      setColors([...colors])
      setIsInitialized(true)
    }
  }, [productState, isInitialized])

  useEffect(() => {
    dispatch(
      getAllProducts({
        brand,
        category,
        tag,
        minPrice,
        maxPrice,
        sort,
        page,
        limit,
      }),
    )
  }, [page, limit, sort, brand, category, tag, minPrice, maxPrice, color, dispatch])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    const timeoutId = setTimeout(() => {
      dispatch(
        elasticSearchProducts({
          query,
        }),
      )
    }, 500)

    setSearchTimeout(timeoutId)
  }

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5 w-[80%] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Shop By Categories</h3>
              <ul className="space-y-2">
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer text-sm capitalize px-3 py-2 rounded-md transition-colors ${
                      category === item ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                    {category === item && (
                      <span
                        className="ml-2 text-xs cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCategory("")
                        }}
                      >
                        ×
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Filter By</h3>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Availability</h5>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="ml-2 text-sm">In Stock (1)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="ml-2 text-sm">Out of Stock (0)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Price</h5>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      className="form-input w-full text-sm"
                      placeholder="From"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-input w-full text-sm"
                      placeholder="To"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Colors</h5>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((item, index) => (
                      <Color key={index} colorName={item} setColor={setColor} />
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Brands</h5>
                  <div className="flex flex-wrap gap-2">
                    {brands?.map((item, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                          brand === item ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setBrand(item)}
                      >
                        {item}
                        {brand === item && (
                          <span
                            className="ml-1 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              setBrand("")
                            }}
                          >
                            ×
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                onClick={() => {
                  dispatch(
                    getAllProducts({
                      brand,
                      category,
                      tag,
                      minPrice,
                      maxPrice,
                      sort,
                      page,
                      limit,
                    }),
                  )
                }}
              >
                Apply Filters
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Product Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((item, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                      tag === item ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setTag(item)}
                  >
                    {item}
                    {tag === item && (
                      <span
                        className="ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setTag("")
                        }}
                      >
                        ×
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Featured Product</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img src="images/watch.jpg" className="w-20 h-20 object-cover rounded" alt="watch" />
                  <div>
                    <h5 className="text-sm font-medium">Kids headphones pack</h5>
                    <ReactStars count={5} size={16} value={4} edit={false} activeColor="#ffd700" />
                    <p className="text-sm font-bold mt-1">$ 300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-sm border-none rounded-md pr-10 pl-3 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {isError && <div className="text-red-500 text-sm mt-1">{message}</div>}
            </div>

            <div className="products-list pb-5">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productState?.products?.map((item, index) => (
                    <ProductCard key={index} product={item} />
                  ))}
                </div>
              )}
              {!isLoading && productState?.products?.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <ResponsivePagination
                current={page}
                total={total}
                onPageChange={(newPage) => setPage(newPage)}
                className="flex justify-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default OurStore

