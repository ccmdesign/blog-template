<template>
  <div class="blog-card" :content="content">
    <slot>
      <div class="stack">
        <img src="" alt="" />
        <h4>{{ content.brow }}</h4>
        <h3>
          <nuxt-link :to="content.url">{{ content.title }}</nuxt-link>
        </h3>
        <nuxt-link :to="content.url">
          <base-button>{{ content.actionLabel }}</base-button>
        </nuxt-link>
        <h4>Tags</h4>
        <div class="cluster">
          <blog-chip 
            v-for="tag in content.tags" 
            :key="tag.tag_slug" 
            :path="tag.tag_slug" 
            :label="tag.tag_label"
          />
        </div>
        <pre>{{content}}</pre>
      </div>
    </slot>
  </div>
</template>

<script setup>
  defineProps({
    content: {
      type: Object,
      default: () => ({
        brow: "",
        title: "",
        actionLabel: "Read more",
        tags: [],
        url: "",
      }),
    },
  });
</script>

<style lang="scss" scoped>
  .blog-card {
    border: 1px solid var(--base-color);
    padding-block: var(--card-padding-block);
    padding-inline: var(--card-padding-inline);
    background-color: #fff;
    position: relative;
    aspect-ratio: 16/9;

    > * {
      --_stack-space: var(--space-xs);
    }

    .featured {
      font-size: var(--size--2);
      border-bottom-left-radius: 4px;
      position: absolute;
      right: 0;
      top: 0;
      padding: 5px 10px;
      background: #000;
      color: var(--base-color);
      font-weight: 800;
    }
  }

  h4 {
    font-size: var(--size--1);
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
    font-size: var(--size-1);
  }

  a {
    text-decoration: none;
  }

  .cluster {
    --_cluster-space: var(--space-3xs);
  }
</style>
