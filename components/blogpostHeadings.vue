<template>
  <hgroup class="headings | center" :content="content">
    <slot>
      <h3 class="brow">{{ content.brow }}</h3>
      <h2 class="title">{{ content.title }}</h2>
      <h4 class="tagline">{{ content.tagline }}</h4>
    </slot>
  </hgroup>
</template>

<script setup>
  defineProps({
    content: Object,
  });
</script>

<style scoped>
  .headings {
    box-sizing: border-box;
    padding-inline: var(--base-padding-inline);
    color: inherit;
    --_headings-text-color: var(--base-color);
  }

  :deep(h2),
  :deep(h3),
  :deep(h4) {
    margin-block: 0;
    margin-inline: 0;
  }

  :deep(h2) {
    font-size: var(--size-3);
  }
  :deep(h3) {
    font-size: var(--size-1);
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: var(--space-3xs);
  }
  :deep(h4) {
    font-size: var(--size-1);
    margin-top: var(--space-m-l);
  }
</style>
