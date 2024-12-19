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
    --_chip-background: var(--base-color-100);
    --_chip-color: var(--base-color-400);
    --_chip-padding: var(--space-3xs) var(--space-xs);
    --_chip-border-color: var(--base-color-500);
    --_chip-border-width: 1px;
    --_chip-border-radius: 40px;
    --_chip-font-size: var(--size--1);
    --_chip-font-weight: 400;
    --_chip-shadow: none;
  }
  .chip {
    font-size: var(--_chip-font-size);
    font-weight: var(--_chip-font-weight);
    background: var(--_chip-background);
    color: var(--_chip-color);
    padding: var(--_chip-padding);
    border-radius: var(--_chip-border-radius);
    border: var(--_chip-border-width) solid var(--_chip-border-color);
    box-shadow: var(--_chip-shadow);
  }
</style>
