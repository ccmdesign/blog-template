<template>
  <hgroup class="headings | center" :brow="brow" :title="title" :tagline="tagline">
    <div class="stack">
      <slot>
        <h3 v-if="brow">{{ brow }}</h3>
        <h1 v-if="title">{{ title }}</h1>
        <h4 v-if="tagline">{{ tagline }}</h4>
      </slot>
    </div>
  </hgroup>
</template>

<script setup>
  defineProps({
    brow: {
      type: String,
      default: "Default Brow",
    },
    title: {
      type: String,
      default: "Default Title",
    },
    tagline: {
      type: String,
      default: "Default Tagline",
    },
  });
</script>

<style lang="scss" scoped>
  .headings {
    box-sizing: border-box;
    padding-inline: var(--base-padding-inline);
    color: inherit;
    --_headings-text-color: var(--base-color);

    h3 {
      font-size: var(--size-1);
      color: var(--_headings-text-color);
    }

    h1 {
      font-size: var(--size-3);
      color: var(--_headings-text-color);
    }

    h4 {
      font-weight: 300;
      color: var(--_headings-text-color);
    }

    .stack {
      --_stack-space: var(--space-2xs);
    }
  }
</style>
