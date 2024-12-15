<template>
  <section class="blog-post-list | base-section" :content="content">
    <slot>
      <div class="grid">
        <blog-card :content="item" v-for="item in content" :key="item.slug" />
      </div>
    </slot>
  </section>
</template>

<script setup>
defineProps({
  content: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
  section {
    --_section-bg: var(--white-color);
    --_section-color: var(--dark-text-color);
    --_section-padding: var(--section-padding-block);
  }

  section {
    background-color: var(--_section-bg);
    color: var(--_section-color);
    padding-block: var(--_section-padding);
    padding-inline: var(--base-padding-inline);
  }
</style>
