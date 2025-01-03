import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';

const register = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/user/register`, userData);
        if(response.status === 200){
            return response.data;
        } else {
            throw new Error(response.data.message || 'Registration failed');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }

}

const login = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/user/login`, userData);
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


const logout = async () => {
    try {
        const response = await axios.get(`${base_url}/user/logout`,config);
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

const getUserWishlist = async () => {
    try {
        const response = await axios.get(`${base_url}/user/wishlist`,config);
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

const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${base_url}/user/edit-user`, userData, config);
        if(response.status === 200){
            return response.data;
        } else {
            throw new Error(response.data.message || 'Update failed');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

const forgotPasswordToken = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/user/forgot-password-token`, userData);
        if(response.status === 200){
            return response.data;
        } else {
            throw new Error(response.data.message || 'Password reset failed');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

const resetPassword = async (data) => {
    try {
        const response = await axios.put(`${base_url}/user/reset-password/${data.token}`, {password:data?.password});
        if(response.status === 200){
            return response.data;
        } else {
            throw new Error(response.data.message || 'Password reset failed');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export const authService = {
    register,
    login,
    logout,
    getUserWishlist,
    updateUser,
    forgotPasswordToken,
    resetPassword
}