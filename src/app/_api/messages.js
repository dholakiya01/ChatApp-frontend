import axiosInstance from "./interseptor";

export const Getmessages = async (selectedUser, token) => {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/message/${selectedUser?._id}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            withCredentials: true
        });
    return response
};

export const Sendmessage = async (selectedUser, message, token) => {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/message/send/${selectedUser?._id}`, { message }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        withCredentials: true
    });
    return response;
}