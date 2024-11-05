<template>
  <header>
    <div class="center">
      <div class="stack">
        <h1>Blog Header</h1>
        <nuxt-link v-if="$route.path !== '/updates'" to="/updates">Back to Blog</nuxt-link>
      </div>
      
    </div>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
header {
  --_header-bg: var(--base-color);
  --_header-color: var(--light-text-color);
  --_header-padding: var(--section-padding-block);
}

header {
  background-color: var(--_header-bg);
  color: var(--_header-color);
  padding-block: var(--_header-padding);
}
</style>
