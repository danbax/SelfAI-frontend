<script setup lang="ts">
import type { ICategory } from "@src/types";
import { Ref, ref, onMounted, computed } from "vue";

import useStore from "@src/store/store";

import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import CategoryInfoModal from "@src/components/shared/modals/CategoryInfoModal/CategoryInfoModal.vue";
import NoCategories from "@src/components/states/empty-states/NoCategories.vue";
import { useCategoriesStore } from "@src/store/categories";
import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import ExpandTransition from "@src/components/ui/transitions/ExpandTransition.vue";
import Category from "@src/components/views/HomeView/Sidebar/Categories/Categories.vue";
import CategoryList from "@src/components/views/HomeView/Sidebar/Categories/CategoryList.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";

const store = useStore();


// Use the store
const categoriesStore = useCategoriesStore();

// Getters from the store
const categories = computed(() => categoriesStore.categories);
const loading = computed(() => categoriesStore.loading);
const error = computed(() => categoriesStore.error);

onMounted(() => {
  const dto = { languageCode: 'english' };
  categoriesStore.getCategories(dto);
});

const selectedCategory: Ref<ICategory | null> = ref(null);
const openInfoModal = ref(false);

const handleOpenInfoModal = (category: ICategory) => {
  categoriesStore.setCurrentCategory(category);

  if (openInfoModal.value) return;
  openInfoModal.value = true;
  selectedCategory.value = category;
};

</script>

<template>
  <div>
    <SidebarHeader>
      <!--title-->
      <template v-slot:title>Categories</template>
    </SidebarHeader>

    <!--content-->
    <div
      ref="contactContainer"
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
    >
      <Circle2Lines
        v-if="store.status === 'loading' || store.delayLoading"
        v-for="item in 6"
      />

      <div v-else>
        <ExpandTransition>
          <!----
          <div
            class="max-h-[12.5rem]"
            v-if="store.activeCategory"
          >
            <Category
              v-if="store.activeCategory"
              :category="store.activeCategory"
              :open-voice-category-modal="() => (store.openVoiceCategory = true)"
              :end-category="
                () => {
                  store.activeCategory = undefined;
                  //store.categoryMinimized = false;
                }
              "
              active
            />
          </div>
        -->
        </ExpandTransition>
        <CategoryList
          v-if="(categories as ICategory[])?.length > 0"
          delay-loading="chat.delayLoading"
          :chat-status="store.status"
          :open-info-modal="handleOpenInfoModal"
          :categories="<ICategory[]>categories"
        />

        <no-categories v-else />
      </div>
    </div>

    <CategoryInfoModal
      :open="openInfoModal"
      :close-modal="() => (openInfoModal = false)"
      :category="<ICategory>selectedCategory"
    />

  </div>
</template>
