// src/views/AccessView/GoogleCallback.vue

<template>
  <div>Processing Google login...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@src/store/auth';

export default defineComponent({
  name: 'GoogleCallback',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(async () => {
      const token = route.query.token as string;
      if (token) {
        try {
          await authStore.handleGoogleCallback(token);
          router.push('/');
        } catch (error) {
          console.error('Google login failed:', error);
          router.push('/login');
        }
      } else {
        console.error('No token provided');
        router.push('/login');
      }
    });

    return {};
  },
});
</script>