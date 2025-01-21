import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Carousel } from "react-responsive-carousel"
import Marquee from "react-easy-marquee"
import { motion } from "framer-motion"
import { getBlogs } from "../features/blogs/blogSlice"
import { getAllProducts } from "../features/products/productSlice"
import { services } from "../utils/Data"
import BlogCard from "../components/BlogCard"
import ProductCard from "../components/ProductCard"
import SpecialProduct from "../components/SpecialProduct"

import "react-responsive-carousel/lib/styles/carousel.min.css"

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
}

const Home = () => {
  const dispatch = useDispatch()
  const blogsState = useSelector((state) => state?.blog?.blogs)
  const productState = useSelector((state) => state?.product?.products)

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getBlogs())
  }, [dispatch])

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Carousel
              showIndicators={true}
              showStatus={false}
              showThumbs={false}
              autoPlay={true}
              interval={5000}
              infiniteLoop={true}
              className="carousel-container"
            >
              {[1, 2].map((index) => (
                <div key={index} className="relative aspect-[16/9]">
                  <img
                    src={`images/main-banner${index > 1 ? "-1" : ""}.jpg`}
                    className="w-full h-full object-cover"
                    alt={`Featured banner ${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-12">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className="inline-block px-4 py-1 bg-black text-white text-sm font-medium rounded-2xl mb-4">
                        NEW ARRIVAL
                      </span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">iPad S13+ Pro</h2>
                      <p className="text-gray-200 text-lg mb-6">From $999.00 or $41.62/mo.</p>
                      <Link className="inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                        Shop Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`images/catbanner-0${i}.jpg`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={`Category ${i}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-purple-400 text-sm font-medium">Best Sale</span>
                  <h3 className="text-xl font-bold text-white mb-1">iPad S13+ Pro</h3>
                  <p className="text-gray-300 text-sm">From $999.00</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-6 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-100">
                  <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-6 h-6" />
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 ">{service.title}</h6>
                  <p className="text-lg text-gray-600 font-semibold">{service.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Featured Collection</h2>
            <div className="mt-2 w-20 h-1 bg-purple-600 mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productState.slice(0, 8).map(
              (product) =>
                product.tags === "featured" && (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Special Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Special Products</h2>
            <div className="mt-2 w-20 h-1 bg-purple-600 mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productState?.slice(0, 4).map(
              (product) =>
                product.tags === "special" && (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <SpecialProduct product={product} />
                  </motion.div>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <Marquee duration={50000} className="flex items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="mx-12">
                  <img
                    src={`images/brand-0${i}.png`}
                    alt={`Brand ${i}`}
                    className="h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Latest From Our Blog</h2>
            <div className="mt-2 w-20 h-1 bg-purple-600 mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogsState.slice(0, 4).map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

