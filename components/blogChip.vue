<template>
  <component
    :is="path ? 'nuxt-link' : 'span'"
    class="chip"
    :to="path">
    <slot>
      {{ label }}
    </slot>
  </component>
</template>

<script setup>
  const props = defineProps({
    path: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Tag Name",
    },
  });


</script>

<style lang="scss" scoped>
  .chip {
    --_chip-bg: var(--base-color-10-tint);
    --_chip-bg: red;
    --_chip-color: var(--light-text-color);
    --_chip-padding: var(--space-3xs) var(--space-xs);
    --_chip-border-color: var(--base-color-30-tint);
  }
  .chip {
    font-size: var(--size--1);
    font-weight: 400;
    background-color: var(--_chip-bg);
    color: var(--_chip-color);
    padding: var(--_chip-padding);
    border-radius: 100px;
  }
</style>
