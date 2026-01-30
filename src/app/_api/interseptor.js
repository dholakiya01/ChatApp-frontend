import axios from "axios"
import toast from "react-hot-toast";
import { logoutuser } from "./user";
import { logoutSuccess } from "@/redux/userSlice";
import store from "@/redux/store";

const axiosInstance = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BACKEND_PORT,
    withCredentials:true
});

export default axiosInstance;

let isLogoutInProgress = false;

// Handle Logout
const handlelogOut = (accessToken, message) => {
    if (!isLogoutInProgress) {
        isLogoutInProgress = true; // Set the flag to prevent multiple toasts
        toast.error(message);
        store?.dispatch(logoutSuccess());
        localStorage.removeItem('persist:root');
        const infoMessage = accessToken
            ? 'Your session has expired. Please log in again to continue using the website...!!'
            : 'Access denied for unauthorized users..!!';

        console.error(infoMessage); // Log the message for debugging
    }
};
// /lib/axios.js
axiosInstance.interceptors.request.use(
  async(config) => {
    // Get token (example: from localStorage)
    const token = await store?.getState().user.token;    
    if (token) {
      config.headers.Authorization = token;
    }
    return config; // important
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if (error.code === 'ERR_NETWORK') {
            // Handle network error
            toast.error('Network Error.');
        } else if (error?.response?.status === 401 || error?.response?.status === 403) {
            handlelogOut(error?.config?.headers?.Authorization, error?.response?.data?.msg);
            window.location.href = '/login'
        } else {
            // Handle other errors
            toast.error(error?.response?.data?.message || 'An error occurred. Please try again later.');
        }
        // Reject the error for further handling
        return Promise.reject(error);
});