import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const postQuery = async (query) => {
    try {
        const response = await axios.post(`${base_url}/enquiry/`, query);
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

const getAllQuery = async () => {
    try {
        const response = await axios.get(`${base_url}/enquiry/`, config);
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

    



export const contactService =  {
     postQuery,
        getAllQuery
     };






