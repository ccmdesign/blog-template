<template>
  <blog-section :theme="theme">
    <div class="center">
      <div class="cluster partners-cluster">
        <h4 class="partners-title" split>Partners</h4>
        <img 
          v-for="logo in logos" 
          :key="logo.src" 
          :src="theme === 'dark' ? logo.src_dark : logo.src_light" 
          :alt="logo.alt" 
          :style="{ '--_partners-image-width': logo.maxWidth }" 
        />
      </div>
    </div>
  </blog-section>
</template>

<script setup>
  const props = defineProps({
    logos: {
      type: Array
    },
    theme: {
      type: String,
      default: "light"
    }});
</script>

<style lang="scss" scoped>
  .partners-title {
    margin-block: 0;
  }

  .cluster {
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xl);
  }

  @media (max-width: 1000px) {
    h4 {
      width: 100%;
      text-align: center;
    }
  }

  img {
    // --_partners-image-width is being declared in the HTML section
    --_partners-image-height: var(--partners-image-height, auto);
    max-width: var(--_partners-image-width);
    max-height: var(--_partners-image-height);
  }
</style>
