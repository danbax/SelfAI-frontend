import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';
import { GetSessionsDTO } from '@src/dto/GetSessionsDTO';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Session {
  id: number;
  name: string;
  title: string;
  text: string;
  sessionId: number;
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface SessionsState {
  sessions: Session[];
  currentSession: Session | null;
  loading: boolean;
  error: string | null;
}

export const useSessionsStore = defineStore('sessions', {
  state: (): SessionsState => ({
    sessions: [],
    currentSession: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getSessions(dto: GetSessionsDTO) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.post(`${apiBaseUrl}sessions`, {
          categoryId: dto.categoryId,
          languageCode: dto.languageCode || 'english',
        });

        this.sessions = response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to load sessions';
      } finally {
        this.loading = false;
      }
    },

    async completeSession(sessionId: number) {
      try {
        await apiClient.post(`${apiBaseUrl}user-sessions/${sessionId}/complete`);
        const session = this.sessions.find(s => s.id === sessionId);
        if (session) {
          session.isCompleted = true;
        }
        // Unlock the next session if it exists
        const nextSession = this.sessions.find(s => s.id === sessionId + 1);
        if (nextSession) {
          nextSession.isUnlocked = true;
        }
      } catch (error: any) {
        console.error('Failed to complete session:', error);
      }
    },

    setCurrentSession(session: Session) {
      this.currentSession = session;
    },

    clearCurrentSession() {
      this.currentSession = null;
    },
  },
});