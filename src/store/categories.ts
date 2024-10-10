import { defineStore } from 'pinia';
import apiClient from '@src/api/apiClient';
import { LanguageCodeDTO } from '@src/dto/LanguageCodeDTO';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Category {
  id: number;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getCategories(dto: LanguageCodeDTO) {
      this.loading = true;
      this.error = null;

      try {
        const serverResponse = await apiClient.post(`${apiBaseUrl}categories`, {
          languageCode: dto.languageCode || 'english',
        });

        const categories: Category[] = serverResponse.data;
        this.categories = categories;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to load categories';
      } finally {
        this.loading = false;
      }
    },
    setCurrentCategory(category: Category) {
      this.currentCategory = category;
    },
    clearCurrentCategory() {
      this.currentCategory = null;
    },
  },
});
