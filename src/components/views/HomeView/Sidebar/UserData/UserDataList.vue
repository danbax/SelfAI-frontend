<script setup lang="ts">
import UserDataCard from "./UserDataCard.vue";

const props = defineProps<{
  userData: any;
}>();
</script>

<template>
  <div>
    <UserDataCard
      v-for="data in props.userData"
      :data="data"
      role="listitem"
    />
  </div>
</template>