import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const getAProduct = async (productId) => {
  try {
      const response = await axios.get(`${base_url}/product/${productId}`);
      if(response.status === 200){
          return response.data;
      } else {
          throw new Error(response.data.message || 'Login failed');
      }
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
      } else {
          throw new Error('An unknown error occurred');
      }
  }
}

const productService = {
  getProducts,
  createProduct,
  getAProduct
};

export default productService;
