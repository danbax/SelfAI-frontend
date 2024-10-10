<template>
  <button
    :disabled="disabled"
    :class="[
      'group ic-btn',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-110',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
