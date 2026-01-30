import axiosInstance from "./interseptor";

export const loginuser = async (data) => {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, data, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    });
    return response
}

export const logoutuser = async (token) => {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {}, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        withCredentials: true
    });
    return response
}

export const signupUser = async (data) => {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, data, {
        headers: {
            "Content-Type": 'application/json'
        },
        withCredentials: true
    });

    return response
}

export const finduser = async (token) => {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/user/finduser`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        withCredentials: true
    });
    return response;
}