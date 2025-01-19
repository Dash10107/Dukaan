import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, createProducts, resetState } from "../features/product/productSlice";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { uploadImg, delImg } from "../features/upload/uploadSlice";
import { Heart, Edit, Trash2, Plus, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup.array().min(1, "Pick at least one color").required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

export default function ProductGrid() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
      setIsModalOpen(false);
      dispatch(getProducts());
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const categories = ["all", ...new Set(productState.map(product => product.category))];
  const brands = ["all", ...new Set(productState.map(product => product.brand))];

  const coloropt = colorState.map(i => ({
    label: i.title,
    value: i.title,
  }));

  const img = imgState.map(i => ({
    public_id: i.public_id,
    url: i.url,
  }));

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
  }, [color, img]);

  const handleColors = (e) => {
    setColor(e);
  };

  const filteredProducts = productState
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc": return a.title.localeCompare(b.title);
        case "name-desc": return b.title.localeCompare(a.title);
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        default: return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search, Sort and Filters */}
      <div className="mb-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 md:w-48"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 md:w-48"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand === "all" ? "All Brands" : brand}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 md:w-48"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low-High)</option>
          <option value="price-desc">Price (High-Low)</option>
        </select>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-4xl px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">Add Product</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 pb-2">Description</label>
                  <ReactQuill
                    theme="snow"
                    name="description"
                    onChange={formik.handleChange("description")}
                    value={formik.values.description}
                    className="h-32 rounded-lg"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="mt-1 text-sm text-red-600 mb-8">{formik.errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.quantity}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <select
                      name="brand"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brand}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Brand</option>
                      {brandState.map((brand, index) => (
                        <option key={index} value={brand.title}>
                          {brand.title}
                        </option>
                      ))}
                    </select>
                    {formik.touched.brand && formik.errors.brand && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.brand}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      {catState.map((category, index) => (
                        <option key={index} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <select
                    name="tags"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tags}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Tag</option>
                    <option value="featured">Featured</option>
                    <option value="popular">Popular</option>
                    <option value="special">Special</option>
                  </select>
                  {formik.touched.tags && formik.errors.tags && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.tags}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Colors</label>
                  <Select
                    mode="multiple"
                    allowClear
                    className="w-full"
                    placeholder="Select colors"
                    defaultValue={color}
                    onChange={(i) => handleColors(i)}
                    options={coloropt}
                  />
                  {formik.touched.color && formik.errors.color && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.color}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Images</label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="text-center cursor-pointer">
                          <input {...getInputProps()} />
                          <p className="text-sm text-gray-600">
                            Drag 'n' drop some files here, or click to select files
                          </p>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {imgState?.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt=""
                          className="h-24 w-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => dispatch(delImg(image.public_id))}
                          className="absolute -top-2 -right-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-square">
              <img
                src={product.images?.[0] || "/placeholder.svg?height=200&width=200"}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Link 
                  to={`/admin/product/${product._id}`}
                  className="rounded-full bg-white p-2 text-gray-600 shadow-sm hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="rounded-full bg-white p-2 text-gray-600 shadow-sm hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.title}</h3>
              
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{product.brand}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
              
              <div className="mb-4 flex flex-wrap gap-1">
                {product.color?.map((color) => (
                  <span
                    key={color}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {color}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                <span className={`rounded-full px-2 py-1 text-xs ${
                  product.quantity > 0 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <div className=" flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black text-center">
                <Link 
                  to={`/admin/product/${product._id}`}
                >
                <button
                className="hover:text-white" 
                  disabled={product.quantity === 0}
                  >
                  Add to Cart
                </button>
                  </Link>
                </div>
                <button className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}