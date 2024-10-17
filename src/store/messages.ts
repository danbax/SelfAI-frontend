// useMessageStore.ts

import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';
import { useChatStore } from './chats';
import { useAuthStore } from './auth';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Message {
  id: number;
  chatId: number;
  role: string;
  message: string;
  createDate: string;
}

export interface CreateMessageDto {
  chat_id: number;
  role: string;
  message: string;
}

export interface Session {
  sessionId: number;
  title: string;
}

export interface Chat {
  id: number;
  userId: number;
  sessionId: string;
  createDate: string;
  date: string;
  sender: string;
  state: string;
  session: Session;
  messages: Message[];
}

interface MessagesState {
  currentChat: Chat | null;
  messages: Message[];
  loaders: {
    fetchMessages: boolean;
    sendMessage: boolean;
  };
  error: string | null;
}

export const useMessageStore = defineStore('messages', {
  state: (): MessagesState => ({
    messages: [],
    currentChat: null,
    loaders: {
      fetchMessages: false,
      sendMessage: false,
    },
    error: null,
  }),
  actions: {
    async fetchMessagesByChat(chatId: number) {
      this.loaders.fetchMessages = true;
      this.error = null;
      try {
        const response = await apiClient.get(`${apiBaseUrl}chats/${chatId}`);
        this.currentChat = response.data;
        this.messages = response.data.messages;

      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to load messages';
      } finally {
        this.loaders.fetchMessages = false;
      }
    },
    async addMessage(createMessageDto: CreateMessageDto) {
      this.error = null;
      try {

        const newMessage: Message = {
          id: Date.now(),
          chatId: createMessageDto.chat_id,
          role: createMessageDto.role,
          message: createMessageDto.message,
          createDate: new Date().toISOString(),
        };

        this.messages.push(newMessage);

        const chatStore = useChatStore();
        const assistantMessage = await chatStore.addMessageToChat(createMessageDto);

        if(assistantMessage)
        {
          this.messages.push(assistantMessage);
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to add message';
        throw error;
      }
    },
    async sendMessage(createMessageDto: CreateMessageDto) {
      this.loaders.sendMessage = true;
      this.error = null;
      try {
        await this.addMessage(createMessageDto);
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to send message';
        throw error;
      } finally {
        this.loaders.sendMessage = false;
      }
    },
    clearMessages() {
      if (!this.currentChat || !this.currentChat.messages) return;
      this.currentChat.messages = [];
      this.messages = [];
    },
  },
});
