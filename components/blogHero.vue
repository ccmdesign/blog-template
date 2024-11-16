<template>
  <header class="hero">
    <blog-nav />
    <blog-announcement />
    <blog-headings />
    <div class="center">
      <div class="stack">
        <nuxt-link v-if="$route.path !== '/updates'" to="/updates"
          >Back to Blog</nuxt-link
        >
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
  .hero {
    --_header-bg: var(--primary-color);
    --_header-color: var(--light-text-color);
  }

  .hero {
    background-color: var(--_header-bg);
    color: var(--_header-color);
    padding-bottom: var(--space-xl);
  }
</style>
