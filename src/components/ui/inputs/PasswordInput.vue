<script setup lang="ts">
import { ref } from "vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
  modelValue?: string; // Changed from 'value' to 'modelValue'
  id?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  bordered?: boolean;
  class?: string;
}>();

const emit = defineEmits(["update:modelValue"]); // Changed from "valueChanged" to "update:modelValue"

const showPassword = ref(false);

const onValueChanged = (value: string) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <LabeledTextInput
    :id="props.id"
    :type="showPassword ? 'text' : 'password'"
    :label="props.label"
    :modelValue="modelValue"
    :placeholder="props.placeholder"
    :class="props.class"
    :bordered="props.bordered"
    @update:modelValue="onValueChanged"
  >
    <template v-slot:endAdornment>
      <IconButton
        title="toggle password visibility"
        aria-label="toggle password visibility"
        class="m-[.5rem] p-2"
        @click="showPassword = !showPassword"
      >
        <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
        <EyeIcon v-else class="w-5 h-5" />
      </IconButton>
    </template>
  </LabeledTextInput>
</template>