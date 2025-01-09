<template>
  <header class="hero" :mini="mini" :min-height="minHeight">
    <div class="hero__top">
      <slot name="hero-top">
        <blog-announcement />
      </slot>
    </div>

    <div class="hero__middle" v-if="!mini">
      <div class="hero__title">
        <blog-headings :horizontal="horizontal" :title="title" :tagline="tagline" :brow="brow" />
      </div>
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
    brow: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    tagline: {
      type: String,
      default: "",
    },
    horizontal: {
      type: Boolean,
      default: false,
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
    --_hero-middle-padding: var(--space-2xl);
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
    padding-top: var(--_hero-middle-padding);
    grid-area: middle;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    gap: var(--_hero-middle-gap);
    overflow: hidden;
    justify-content: end;
  }
    .hero__title {
      width: 100%;
      :deep(.headings){
          --_headings-title-font-size: var(--size-4);
          --_headings-title-font-weight: 400;
          --_headings-title-color: var(--white-color);
          --_headings-tagline-font-family: var(--display-font);

          --_headings-tagline-font-size: var(--size-1);
          --_headings-tagline-color: var(--white-color);
      }
    }

  .hero__bottom {
    grid-area: bottom;
  }
</style>
