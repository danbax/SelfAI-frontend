<script setup lang="ts">
import type { ICategory } from "@src/types";
import Category from "@src/components/views/HomeView/Sidebar/Categories/Category.vue";

const props = defineProps<{
  categories: ICategory[];
  chatStatus: string;
  delayLoading: string;
  openInfoModal: (category: ICategory) => void;
}>();
</script>

<template>
  <div>
    <Category
      v-for="category in props.categories"
      :category="category"
      :open-info-modal="props.openInfoModal"
    />
  </div>
</template>
