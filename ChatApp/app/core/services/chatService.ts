import axios from 'axios';

const API_URL = 'https://mock-api-server.com/chats';

export const createChat = async (chatData: any) => {
    const response = await axios.post(API_URL, chatData);
    return response.data;
};

export const updateChat = async (chatId: string, chatData: any) => {
    const response = await axios.put(`${API_URL}/${chatId}`, chatData);
    return response.data;
};

export const deleteChat = async (chatId: string) => {
    const response = await axios.delete(`${API_URL}/${chatId}`);
    return response.data;
};

export const getChats = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
