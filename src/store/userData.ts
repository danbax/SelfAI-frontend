import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';

interface UserData {
  [key: string]: any;
}

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    userData: {} as UserData,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUserData(userDataType: string) {
      this.loading = true;
      this.error = null;

      
      this.userData = [
        {
          title: "Improve Physical Health",
          description: "Focus on regular exercise and a balanced diet.",
          icon: "mdi:run",
          specific: "Exercise 3 times per week and eat balanced meals.",
          measurable: "Track exercise frequency and diet improvements.",
          achievable: "Start with 30-minute exercises and adjust diet gradually.",
          relevant: "This will improve overall health and well-being.",
          timeBound: "Achieve a consistent routine within 3 months.",
          createDate: "2024-10-11",
          isActive: true,
          progress: 0
        },
        {
          title: "Increase Productivity",
          description: "Enhance time management and work efficiency.",
          icon: "mdi:calendar-check",
          specific: "Use time-blocking to focus on high-priority tasks.",
          measurable: "Track daily completion of time-blocked tasks.",
          achievable: "Adjust work routine and eliminate distractions.",
          relevant: "Improves work performance and personal development.",
          timeBound: "Increase productivity within the next 6 weeks.",
          createDate: "2024-10-11",
          isActive: false,
          progress: 3
        },
        {
          title: "Learn New Skill",
          description: "Dedicate time to mastering a new technical or creative skill.",
          icon: "mdi:school",
          specific: "Complete an online course in web development.",
          measurable: "Finish 2 lessons per week and apply the knowledge.",
          achievable: "Manage time effectively to balance learning and other responsibilities.",
          relevant: "Develop skills that contribute to professional growth.",
          timeBound: "Complete the course and a project within 4 months.",
          createDate: "2024-10-11",
          isActive: true,
          progress: 1
        },
        {
          title: "Enhance Financial Planning",
          description: "Create a budget and track expenses to improve savings.",
          icon: "mdi:cash",
          specific: "Set a budget and save 10% of monthly income.",
          measurable: "Track spending and savings on a monthly basis.",
          achievable: "Identify unnecessary expenses and reduce them.",
          relevant: "Improves long-term financial stability.",
          timeBound: "Reach savings goal in 6 months.",
          createDate: "2024-10-11",
          isActive: true,
          progress: 0
        },
        {
          title: "Strengthen Relationships",
          description: "Spend quality time with family and friends.",
          icon: "mdi:account-group",
          specific: "Plan regular meetups and meaningful conversations.",
          measurable: "Have at least 2 social interactions per week.",
          achievable: "Prioritize personal connections over other commitments.",
          relevant: "Improves emotional well-being and support network.",
          timeBound: "Build stronger connections within 2 months.",
          createDate: "2024-10-11",
          isActive: false,
          progress: 2
        }
      ];
      
      this.loading = false;
      return;
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