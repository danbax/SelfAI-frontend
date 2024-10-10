// src/store/auth.ts

import { defineStore } from 'pinia';
import apiClient from "../api/apiClient";

interface UserSettings {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  darkMode: boolean;
  pinCode?: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        error: null,
        accessToken: localStorage.getItem('access_token') || null,
        userSettings: {
            darkMode: false,
        } as UserSettings,
    }),
    actions: {
        async login(email: string, password: string) {
          try {
              const response = await apiClient.post(`/auth/login`, {
                  email,
                  password,
              });
              console.log('Auth store: API response received', response);  
              this.user = response.data.user;
              this.accessToken = response.data.access_token;
              this.isAuthenticated = true;
              this.error = null;
      
              localStorage.setItem('access_token', response.data.access_token);
          }
          catch (error: any) {
              this.error = error.response?.data?.message || 'Login failed';
              this.isAuthenticated = false;
          }
        },    
        async register(email: string, password: string, firstName: string, lastName: string) {
          console.log('Auth store register function called');
          try {
              console.log('Auth store: About to make API request');
              const response = await apiClient.post(`auth/register`, {
                  email,
                  password,
                  firstName,
                  lastName,
              });
              console.log('Auth store: API response received', response);
              this.isAuthenticated = true;
              this.error = null;
              this.accessToken = response.data.access_token ?? response;

              localStorage.setItem('access_token', "ASdgdsg");
          }
          catch (error: any) {
              console.error('Auth store: Registration error', error);
              this.error = error.response?.data?.message || 'Registration failed';
              this.isAuthenticated = false;
          }
        },
        logout() {
            this.user = null;
            this.isAuthenticated = false;
            this.error = null;
            this.userSettings = {
                darkMode: false,
            } as UserSettings;
            localStorage.removeItem('access_token');
        },
        async fetchUserSettings() {
            try {
                const response = await apiClient.get('/users/settings');
                this.userSettings = response.data;
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to fetch user settings';
            }
        },
        async updateUserSettings(settings: Partial<UserSettings>) {
            try {
                const response = await apiClient.put('/users/settings', settings);
                this.userSettings = response.data;
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to update user settings';
                throw error;
            }
        },
    },
});