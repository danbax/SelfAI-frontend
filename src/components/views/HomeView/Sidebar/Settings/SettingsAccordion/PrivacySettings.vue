<script setup lang="ts">
import { ref, computed } from "vue";
import useStore from "@src/store/store";
import { useAuthStore } from "@src/store/auth";
import AccordionButton from "@src/components/ui/data-display/AccordionButton.vue";
import Collapse from "@src/components/ui/utils/Collapse.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
import Button from "@src/components/ui/inputs/Button.vue";

const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const store = useStore();
const authStore = useAuthStore();

const loading = ref(false);

const pinCode = ref(authStore.userSettings?.pinCode ?? '');

const handleSubmit = async () => {
  loading.value = true;

  try {
    await authStore.updateUserSettings({
      pinCode: pinCode.value,
    });
  } catch (error) {
    console.error("Failed to update PIN code", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AccordionButton
    id="privacy-settings-toggler"
    class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
    :collapsed="props.collapsed"
    chevron
    aria-controls="privacy-settings-collapse"
    @click="props.handleToggle()"
  >
    <p class="mb-4 heading-2 text-color">Privacy & Safety</p>
    <p class="body-2 text-color">Control your privacy settings</p>
  </AccordionButton>

  <Collapse id="privacy-settings-collapse" :collapsed="props.collapsed">
    <LabeledTextInput
      label="PIN Code"
      inputClasses="mb-7"
      type="password"
      maxlength="4"
      v-model="pinCode"
    />
    <div class="pt-3">
      <Button
      class="contained-primary contained-text w-full py-4"
      @click="handleSubmit"
      :loading="loading"
    >
      Save PIN Code
    </Button>
    </div>
  </Collapse>
</template>