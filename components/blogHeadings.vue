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
    --_headings-brow-color: var(--accent-color);
    --_headings-title-color: var(--base-color);
    --_headings-tagline-color: var(--base-color-60-tint);
  }
  
  .headings {
    box-sizing: border-box;
    padding-inline: var(--base-padding-inline);
    color: inherit;

    h3 {
      font-size: var(--size-0);
      color: var(--_headings-brow-color);
      font-weight: 800;
      text-transform: uppercase;
    }

    h1 {
      font-size: var(--size-1);
      line-height: 1.3;
      color: var(--_headings-title-color);
    }

    h4 {
      font-size: var(--size-0);
      line-height: 1.5;
      font-weight: 300;
      color: var(--_headings-tagline-color);
    }

    .stack {
      --_stack-space: var(--space-2xs);
    }
  }
</style>
