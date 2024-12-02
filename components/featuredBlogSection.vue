<template>
  <section class="featured-posts" :layout="layout">
    <ul class="reel overflowing" role="list">
      <slot />
    </ul>
  </section>
</template>

<script setup>
  defineProps({
    layout: {
      type: String,
      default: "default",
    },
  });
</script>

<style lang="scss" scoped>
  section {
    // --_featured-posts-bg: var(--base-color);
    --_featured-posts-color: var(--base-color);
    --_featured-posts-padding: var(--section-padding-block);
  }

  section {
    background: linear-gradient(
      to bottom,
      var(--_featured-posts-bg) 0%,
      var(--_featured-posts-bg) 50%,
      var(--white-color) 50%,
      var(--white-color) 100%
    );

    color: var(--_featured-posts-color);
  }

  .featured-posts[layout="reel"] {
    padding-bottom: var(--_featured-posts-padding);
  }

  @media screen and (max-width: 768px) {
    .featured-posts[layout="reel"] {
      .reel > :deep(:first-child) {
        margin-left: var(--space-2xs);
      }
      .reel > :deep(*) {
        width: 100%;
        max-width: 80svw;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .featured-posts[layout="reel"] {
      .reel > :deep(:first-child) {
        margin-left: var(--space-2xl);
      }
    }
  }

  ul {
    margin: 0;
  }

  // This controls the width of the reel card
  .reel > :deep(*) {
    width: 100%;
    max-width: 600px;
  }
</style>
