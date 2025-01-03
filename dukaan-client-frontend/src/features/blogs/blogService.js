import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const getBlogs = async () => {
    try {
  const response = await axios.get(`${base_url}/blog/`);

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
};


const getBlog = async (id) => {
    try {
    const response = await axios.get(`${base_url}/blog/${id}`, config);
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
  



const blogService = {
    getBlogs,
    getBlog
};

export default blogService;
