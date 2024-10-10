<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import useStore from "@src/store/store";
import { useAuthStore } from "@src/store/auth";
import AccordionButton from "@src/components/ui/data-display/AccordionButton.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
import Collapse from "@src/components/ui/utils/Collapse.vue";

const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const store = useStore();
const authStore = useAuthStore();

const loading = ref(false);

const accountValues = computed(() => ({
  firstName: authStore.userSettings?.firstName ?? store.user?.firstName ?? '',
  lastName: authStore.userSettings?.lastName ?? store.user?.lastName ?? '',
  birthDate: authStore.userSettings?.birthDate ?? '',
}));

onMounted(async () => {
  await authStore.fetchUserSettings();
});

const handleSubmit = async () => {
  loading.value = true;

  try {
    await authStore.updateUserSettings({
      firstName: accountValues.value.firstName,
      lastName: accountValues.value.lastName,
      birthDate: accountValues.value.birthDate,
    });

    store.$patch({
      user: {
        ...store.user,
        firstName: accountValues.value.firstName,
        lastName: accountValues.value.lastName,
      },
    });
  } catch (error) {
    console.error("Failed to update user settings", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AccordionButton
    id="account-settings-toggler"
    class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
    :collapsed="props.collapsed"
    chevron
    aria-controls="account-settings-collapse"
    @click="handleToggle()"
  >
    <p class="heading-2 text-color mb-4">Account</p>
    <p class="body-2 text-color">Update your profile details</p>
  </AccordionButton>

  <Collapse id="account-settings-collapse" :collapsed="props.collapsed">
    <LabeledTextInput
      label="First name"
      inputClasses="mb-7"
      v-model="accountValues.firstName"
    />
    <LabeledTextInput
      label="Last name"
      inputClasses="mb-7"
      v-model="accountValues.lastName"
    />
    <LabeledTextInput
      label="Birth Date"
      inputClasses="mb-7"
      type="date"
      v-model="accountValues.birthDate"
    />
    <div class="pt-3">
      <Button
      class="contained-primary contained-text w-full py-4"
      @click="handleSubmit"
      :loading="loading"
    >
      Save Settings
    </Button>
    </div>
  </Collapse>
</template>