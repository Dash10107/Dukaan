import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

// Fetch all products
const getProducts = async () => {
  const response = await axios.get(`${base_url}product/seller/product`, config);
  return response.data;
};

// Create a new product
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

// Fetch a single product by ID
const getAProduct = async (productId) => {
  try {
    const response = await axios.get(`${base_url}product/${productId}`);
    console.log(response.data)
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Product not found");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching the product"
    );
  }
};

// Add new bulk upload method
const bulkUploadProducts = async (formData) => {
  const response = await axios.post(`http://localhost:4000/api/product/file/bulk`, formData, {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

const productService = {
  getProducts,
  createProduct,
  getAProduct,
  bulkUploadProducts,
}

export default productService