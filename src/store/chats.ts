// src/store/chats.ts

import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';
import { useAuthStore } from './auth';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface CreateChatDto {
  categoryId?: number;
  sessionId?: number;
}

export interface CreateMessageDto {
  chat_id: number;
  role: string;
  message: string;
}

export interface Chat {
  id: number;
  userId: number;
  sessionId: string;
  createDatee: string;
  date: string;
  sender: string;
  state: string;
  messages: Message[];
}

export interface Message {
  id: number;
  chatId: number;
  role: string;
  message: string;
  createDate: string;
}

interface ChatsState {
  chats: Chat[];
  currentChatId: number | null;
  loading: boolean;
  error: string | null;
  totalChats: number;
}

export const useChatStore = defineStore('chats', {
  state: (): ChatsState => ({
    chats: [],
    currentChatId: null,
    loading: false,
    error: null,
    totalChats: 0,
  }),
  getters: {
    currentChat: (state) => state.chats.find(chat => chat.id === state.currentChatId) || null,
  },
  actions: {
    async getChat(chatId: number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.get(`${apiBaseUrl}getChat/${chatId}`);
        const fetchedChat = response.data;
        const existingChatIndex = this.chats.findIndex(chat => chat.id === chatId);
        if (existingChatIndex !== -1) {
          this.chats[existingChatIndex] = fetchedChat;
        } else {
          this.chats.push(fetchedChat);
        }
        this.currentChatId = chatId;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to load chat';
      } finally {
        this.loading = false;
      }
    },
    async getAllChats(params: { page: number; limit: number; search?: string; finished?: boolean }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.get(`${apiBaseUrl}chats`, { params });
        return response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to load chats';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async startNewChat(createChatDto: CreateChatDto) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.post(`${apiBaseUrl}chats/create`, createChatDto);
        this.chats.unshift(response.data);
        this.totalChats++;
        this.currentChatId = response.data.id;
        
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to start a new chat';
      } finally {
        this.loading = false;
      }
    },
    async addMessageToChat(createMessageDto: CreateMessageDto) {
      this.error = null;

      try {
        const response = await apiClient.post(`${apiBaseUrl}messages/send`, createMessageDto);

        const assistantResponse = response.data;

        const assistantMessage: Message = {
          id: Date.now(),
          chatId: createMessageDto.chat_id,
          role: 'assistant',
          message: assistantResponse.text,
          createDate: new Date().toISOString()
        };

        if(assistantResponse.actions)
        {
          for(const action of assistantResponse.actions)
          {
            console.log(action);
            this.handleActionPayload(action);
          }
        }

        return assistantMessage ?? null;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to send message';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    handleActionPayload(payload: { action: string; parameters: any[] }) {
      const { action, parameters } = payload;

      const actionStoreMap: { [key: string]: any } = {
        'clearMessages': this,
        'logout': useAuthStore()
      };

      const store = actionStoreMap[action];

      if (store && typeof store[action] === 'function') {
        store[action](...parameters);
      } else {
        console.warn(`Action "${action}" is not defined in any store.`);
      }
    },
    setCurrentChat(chatId: number) {
      this.currentChatId = chatId;
    },
    clearCurrentChat() {
      this.currentChatId = null;
    },
    replaceChats(newChats: Chat[]) {
      this.chats = newChats;
      this.totalChats = newChats.length;
    },
    appendChats(newChats: Chat[]) {
      this.chats.push(...newChats);
      this.totalChats += newChats.length;
    },
  },
});