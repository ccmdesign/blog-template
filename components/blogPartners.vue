<template>
  <blog-section>
    <div class="center">
      <h4 class="partners-title" split>Partners</h4>
      <div class="cluster partners-cluster">
        <img v-for="logo in logos" :key="logo.src" :src="logo.src" :alt="logo.alt" />
      </div>
    </div>
  </blog-section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    logos: Array<{ src: string; alt: string }>
  }>();

  const defaultLogos = [
    { src: "/images/govlab-logo.svg", alt: "GovLab Logo" },
    { src: "/images/burnes-center-logo.svg", alt: "Burnes Center Logo" },
  ];

  const logos = props.logos.length ? props.logos : defaultLogos;
</script>

<style lang="scss" scoped>
  .partners-title {
    margin-block: 0;
  }

  .cluster {
    align-items: center;
    justify-content: center;
  }

  img {
    --_partners-image-width: var(--partners-image-width);
    --_partners-image-height: var(--partners-image-height);
    max-width: var(--_partners-image-width);
    max-height: var(--_partners-image-height);
  }
</style>
