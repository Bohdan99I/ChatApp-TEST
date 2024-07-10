import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    chats: any[];
}

const initialState: ChatState = {
    chats: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats(state, action: PayloadAction<any[]>) {
            state.chats = action.payload;
        },
        addChat(state, action: PayloadAction<any>) {
            state.chats.push(action.payload);
        },
        removeChat(state, action: PayloadAction<string>) {
            state.chats = state.chats.filter(chat => chat.id !== action.payload);
        },
    },
});

export const { setChats, addChat, removeChat } = chatSlice.actions;
export default chatSlice.reducer;
