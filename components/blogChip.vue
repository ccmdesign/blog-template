<template>
  <component
    :is="content.url ? 'nuxt-link' : content.component || 'span'"
    class="chip"
    :content="content"
    :to="content.url">
    <slot>
      {{ content.label || "Tag Name" }}
    </slot>
  </component>
</template>

<script setup>
  defineProps({
    content: {
      type: Object,
      default: () => ({
        url: "",
        label: "Tag Name",
        component: "span",
      }),
    },
  });
</script>

<style lang="scss" scoped>
  .chip {
    --_chip-bg: var(--base-color-10-tint);
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
