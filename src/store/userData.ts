import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';

interface UserData {
  [key: string]: any;
}

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    userData: [] as UserData,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUserData(userDataType: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await apiClient.get(`/user-data/${userDataType}`);
        this.userData = response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'An error occurred while fetching user data';
      } finally {
        this.loading = false;
      }
    },
    async updateUserData(userDataType: string, updatedData: any) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.put(`/user-data/${userDataType}`, updatedData);
        this.userData = response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'An error occurred while updating user data';
      } finally {
        this.loading = false;
      }
    },
  },
});