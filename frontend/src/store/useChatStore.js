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
    unseenMessagesCount: {},


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
            set({ messages: [...messages, res.data] });
        }catch(error) {
            toast.error("Error sending message", {autoClose: 3000});
        } 
    },

    incrementUnseenCount: (senderId) => {
        set((state) => {
            const count = state.unseenMessagesCount[senderId] || 0;
            return {
                unseenMessagesCount: {
                    ...state.unseenMessagesCount,
                    [senderId]: count + 1
                }
            };
        });
    },

    resetUnseenCount: (userId) => {
        set((state) => {
            const newCount = { ...state.unseenMessagesCount };
            delete newCount[userId]; // Reset unseen count for selected user
            return {
                unseenMessagesCount: newCount
            };
        });
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const { userId } = useAuthStore.getState(); 
        if (!userId) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
            if (!newMessage || !newMessage.senderId) return;
    
            const isMessageSentFromSelectedUser = newMessage.senderId.toString() === selectedUser._id.toString();
            if (!isMessageSentFromSelectedUser) return;
    
            if (newMessage.receiverId.toString() === userId.toString()) {
                get().incrementUnseenCount(newMessage.senderId);
            }
            
            set({
                messages: [...get().messages, newMessage]
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: async (selectedUser) => {
        set({ selectedUser });
        // Reset unseen count when the user clicks to chat with another user
        get().resetUnseenCount(selectedUser._id);
    },
}))