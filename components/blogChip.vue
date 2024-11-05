<template>
  <component :is="content.url ? 'nuxt-link' : (content.component || 'span')" class="blog-chip" :content="content" :to="content.url">
    <slot>
      {{ content.label || 'Tag Name' }}
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
      component: "span"
    })
  }
});

</script>

<style lang="scss" scoped>
.blog-chip {
  font-size: var(--size--1);
  font-weight: 400;
  background-color: var(--base-color);
  color: var(--light-text-color);
  padding: var(--space-3xs) var(--space-xs);
  border-radius: 100px;
}
</style>
