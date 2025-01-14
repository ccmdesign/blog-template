<template>
  <hgroup class="headings" :class="{'headings--horizontal': horizontal && tagline}" :brow="brow" :title="title" :tagline="tagline" :clip="clip" >
    <div class="stack">
      <slot>
        <h3 v-if="brow" class="headings__brow">{{ brow }}</h3>
        <h1 v-if="title" class="headings__title" v-html="title"></h1>
        <h4 v-if="tagline" class="headings__tagline" v-html="tagline"></h4>
      </slot>
    </div>
  </hgroup>
</template>

<script setup>
  defineProps({
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
    clip: {
      type: String,
      default: "",
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style>
[container="blog-headings"] {
  container-type: inline-size;
  container-name: blog-headings-container;
}
</style>

<style lang="scss" scoped>
  .headings {
    --_headings-brow-font-family: var(--display-font);
    --_headings-brow-font-size: var(--size-0);
    --_headings-brow-font-style: normal;
    --_headings-brow-font-weight: 800;
    --_headings-brow-color: var(--accent-color);
    --_headings-brow-background: transparent;
    --_headings-brow-line-height: 1.2;
    --_headings-brow-text-transform: uppercase;

    --_headings-title-font-family: var(--display-font);
    --_headings-title-font-size: var(--size-1);
    --_headings-title-font-style: normal;
    --_headings-title-font-weight: 700;
    --_headings-title-color: var(--base-color);
    --_headings-title-background: transparent;
    --_headings-title-line-height: 1.3;
    --_headings-title-text-transform: none;

    --_headings-tagline-font-family: var(--body-font);
    --_headings-tagline-font-size: var(--size-0);
    --_headings-tagline-font-style: normal;
    --_headings-tagline-font-weight: 300;
    --_headings-tagline-color: var(--base-color-500);
    --_headings-tagline-background: transparent;
    --_headings-tagline-line-height: 1.5;
    --_headings-tagline-text-transform: none;
    
    --_headings-gap: var(--size-4);
  }
  
  @container (min-width: 700px) {
    .headings {
      --_headings-brow-font-size: var(--size-0);
      --_headings-title-font-size: var(--size-2);
      --_headings-title-line-height: 1;
      --_headings-tagline-font-size: var(--size-1);
      --_headings-tagline-color: var(--base-color-400);
    }
  }

  .headings {
    box-sizing: border-box;
    color: inherit;

    h3 {
      font-size: var(--_headings-brow-font-size);
      color: var(--_headings-brow-color);
      font-weight: var(--_headings-brow-font-weight);
      text-transform: var(--_headings-brow-text-transform);
      line-height: var(--_headings-brow-line-height);
    }

    h1 {
      font-size: var(--_headings-title-font-size);
      line-height: var(--_headings-title-line-height);
      color: var(--_headings-title-color);
      text-transform: var(--_headings-title-text-transform);
      
    }

    h4 {
      font-size: var(--_headings-tagline-font-size);
      line-height: var(--_headings-tagline-line-height);
      font-weight: var(--_headings-tagline-font-weight);
      color: var(--_headings-tagline-color);
      text-transform: var(--_headings-tagline-text-transform);
    }
    

    .stack {
      --_stack-space: var(--space-2xs);
    }
  }
  
  @media (min-width: 700px) {
    .stack {
      align-items: flex-start;
    }

    .headings--horizontal {
      .stack {
        flex-flow: row nowrap;
        justify-content: flex-start;
        gap: var(--_headings-gap);
        align-items: flex-start;
        & > * {
          width: calc(50% - calc(var(--_headings-gap) / 2));
        }
        & > * + * {
          margin-block-start: 0;
        }
        .headings__tagline {
          text-align: right;
        }
      }
    }
  }

  // This is temporary. The limitation of the characters will be made in Directus.

  // The following CSS rules for the h4 element are used to create a multi-line text truncation effect.
  // The display: -webkit-box; and -webkit-box-orient: vertical; properties are used to create a flexible box layout.
  // The -webkit-line-clamp: 7; property limits the text to 7 lines, and overflow: hidden; hides any overflowing content.
  // This approach is specific to WebKit-based browsers and is commonly used for truncating text with ellipsis.

  [clip="tagline"] h4 {
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
