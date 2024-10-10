import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Notification {
  id: number;
  userId: number;
  title: string;
  text: string;
  icon?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  totalNotifications: number;
  page: number;
  limit: number;
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationsState => ({
    notifications: [],
    loading: false,
    error: null,
    totalNotifications: 0,
    page: 1,
    limit: 10,
  }),

  actions: {
    async fetchNotifications(isRead?: boolean) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.get(`${apiBaseUrl}notifications`, {
          params: {
            page: this.page,
            limit: this.limit,
            isRead,
          },
        });

        this.notifications.push(...response.data.notifications);
        this.totalNotifications = response.data.total;
        this.page++;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch notifications';
      } finally {
        this.loading = false;
      }
    },

    async markAsRead(notificationId: number) {
      try {
        await apiClient.put(`${apiBaseUrl}notifications/${notificationId}`, {
          isRead: true,
        });

        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
          this.notifications[index].isRead = true;
        }
      } catch (error: any) {
        console.error('Failed to mark notification as read:', error);
      }
    },

    async markAllAsRead() {
      try {
        await apiClient.put(`${apiBaseUrl}notifications/mark-all-read`);
        this.notifications.forEach(notification => {
          notification.isRead = true;
        });
      } catch (error: any) {
        console.error('Failed to mark all notifications as read:', error);
      }
    },

    resetNotifications() {
      this.notifications = [];
      this.page = 1;
      this.totalNotifications = 0;
    },
  },
});