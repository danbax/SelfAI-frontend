<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['active-section-change']);
</script>

<template>
  <div>
    <!--form-->
    <div class="mb-5">
      <LabeledTextInput
        v-model="formData.email"
        label="Email"
        placeholder="Enter your email"
        class="mb-5"
      />
      <LabeledTextInput
        v-model="formData.firstName"
        label="First Name"
        placeholder="Enter your first name"
        class="mb-5"
      />
      <LabeledTextInput
        v-model="formData.lastName"
        label="Last Name"
        placeholder="Enter your last name"
        class="mb-5"
      />
    </div>
    <!--local controls-->
    <div class="mb-6">
      <Button
        class="contained-primary contained-text w-full mb-4"
        @click="emit('active-section-change', { sectionName: 'password-section', animationName: 'slide-left' })"
      >
        Next
      </Button>
    </div>
  </div>
</template>
