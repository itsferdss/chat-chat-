import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from 'react-toastify';
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create ((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        set({ isUsersLoading: true});
        try{
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data });
        } catch(error) {
            toast.error("Error fetching users", {autoClose: 3000});
        } finally{
            set({ isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true});
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch(error) {
            toast.error("Error fetching messages", {autoClose: 3000});
        } finally{
            set({ isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()

        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messaged: [...messages, res.data]});
        }catch(error) {
            toast.error("Error sending message", {autoClose: 3000});
        } 
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return
            
            set({ 
                messages: [...get().messages, newMessage] });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: async (selectedUser) => set({ selectedUser }),
}))