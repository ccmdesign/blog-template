<template>
  <header class="hero" :mini="mini" :min-height="minHeight">
    <div class="hero__top">
      <slot name="hero-top">
        <blog-announcement />
      </slot>
    </div>

    <div class="hero__middle" v-if="!mini">
      <blog-headings />
      <slot>
      </slot>
    </div>

    <div class="hero__bottom">
      <slot name="hero-bottom"></slot>
    </div>
  </header>
</template>

<script setup>
  defineProps({
    mini: {
      type: Boolean,
      default: false,
    },
    minHeight: {
      type: String,
      default: "80svh",
    },
  });

  
</script>

<style lang="scss" scoped>
  .hero {
    --_hero-bg-fancy: var(--gradient);
    --_hero-bg-color: var(--primary-color);
    --_hero-color: var(--white-color);
    --_hero-min-height: v-bind(minHeight);
    --_hero-middle-gap: var(--space-3xl);
  }

  .hero:deep(*) {
    --_headings-text-color: var(--white-color);
  }

  .hero[mini="true"] {
    --_hero-min-height: auto;
  }

  .hero {
    background-color: var(--_hero-bg-color);
    background: var(--_hero-bg-fancy, var(--_hero-bg-color));
    color: var(--_hero-color);
    min-height: var(--_hero-min-height);
  }

  .hero {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "top" "middle" "bottom";
  }

  .hero__top {
    grid-area: top;
  }

  .hero__middle {
    grid-area: middle;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    gap: var(--_hero-middle-gap);
    overflow: hidden;
    justify-content: end;
  }

  .hero__bottom {
    grid-area: bottom;
  }
</style>
