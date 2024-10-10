<script setup lang="ts">
import PasswordInput from "@src/components/ui/inputs/PasswordInput.vue";
import Button from "@src/components/ui/inputs/Button.vue";
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['active-section-change', 'register']);
</script>

<template>
  <div>
    <div class="mb-5">
      <!--form-->
      <PasswordInput
        v-model="formData.password"
        label="Password"
        placeholder="Enter your password"
        class="mb-4"
      />
      <PasswordInput
        v-model="formData.confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
      />
    </div>
    <!--controls-->
    <div class="mb-5">
      <Button class="contained-primary contained-text w-full mb-4" @click="emit('register')">
        Sign up
      </Button>
      <Button
        class="outlined-primary outlined-text w-full"
        @click="emit('active-section-change', { sectionName: 'personal-section', animationName: 'slide-right' })"
      >
        Back
      </Button>
    </div>
  </div>
</template>
