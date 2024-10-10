<script setup lang="ts">
import { computed, ref } from "vue";

import { ICategory } from "@src/types";

import { Icon } from '@iconify/vue';
import CallAvatar from "@src/components/shared/blocks/CallAvatar.vue";

const props = defineProps<{
  category: ICategory;
  active?: boolean;
  openInfoModal?: (category: ICategory) => void;
  openVoiceCategoryModal?: () => void;
  endCategory?: () => void;
}>();

const members = ref([
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    avatar: "https://randomuser.me/api/",
    email: "fs@gmail.com",
    lastSeen: new Date(),
  }
]);

const handleOpenInfoModal = () => {
  if (props.openInfoModal && !props.active) {
    props.openInfoModal(props.category);
  }
};
</script>

<template>
  <div>
    <component
      :is="props.active ? 'div' : 'button'"
      aria-label="voice category with"
      @click="handleOpenInfoModal"
      class="w-full h-[5.75rem] px-5 py-6 mb-3 flex rounded focus:outline-none transition duration-500 ease-out"
      :class="
        props.active
          ? ['border border-dashed border-green-100 dark:border-green-800']
          : [
              'focus:bg-indigo-50 dark:active:bg-gray-600 dark:focus:bg-gray-600 dark:hover:bg-gray-600 hover:bg-indigo-50 active:bg-indigo-100',
            ]
      "
      tabindex="0"
    >
      <!--profile images-->
      <div :class="members.length === 1 ? ['mr-4'] : ['mr-[2rem]']">
        <div class="relative">
          <button
            class="relative block"
            @click="props.openVoiceCategoryModal"
          >
            <CallAvatar
              v-for="(member, index) in members"
              :member="member"
              :index="index"
              :members-length="members.length"
            />
          </button>
          <div
            class="absolute top-0 right-0 w-7 h-7 bg-green-120 dark:bg-green-800 rounded-full flex justify-center items-center"
          >
            <Icon :icon="category.icon" class="w-6 h-6 text-green-500 dark:text-green-300" />
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col">
  <div class="w-full">
    <!--contacts names-->
    <div class="flex items-start">
      <div class="grow mb-4 text-start">
        <button
          v-if="props.active"
          class="block"
          @click="props.openVoiceCategoryModal"
        >
          <p class="heading-2 text-color">
            {{ props.category.name }}
          </p>
        </button>

        <p v-else class="heading-2 text-color">
          {{ props.category.name }}
        </p>
      </div>
    </div>
  </div>

  <!-- Description with same left alignment -->
  <div class="w-full">
    <p
      v-if="props.active"
      class="body-2 text-indigo-300 text-start"
    >
      {{ props.category.description }}
    </p>

    <p v-else class="body-2 text-color text-start">
      {{ props.category.description }}
    </p>
  </div>
</div>

    </component>
  </div>
</template>
