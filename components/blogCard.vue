<template>
  <div class="blog-card" :content="content">
    <div v-if="content.featured" class="featured">FEATURED</div>
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
          <nuxt-link
            v-for="tag in content.tags"
            :to="`/updates/tags/${tag.tag_slug}`">
            <blog-chip>{{ tag.tag_label }}</blog-chip>
          </nuxt-link>
        </div>
        <!-- <pre>{{content}}</pre> -->
      </div>
    </slot>
  </div>
</template>

<script setup>
  defineProps({
    content: {
      type: Object,
      default: () => ({
        brow: "brow",
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
    padding-block: var(--card-padding-block);
    padding-inline: var(--card-padding-inline);
    position: relative;

    > * {
      --_stack-space: var(--space-xs);
    }
  }

  h4 {
    font-size: var(--size--1);
    text-transform: uppercase;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h3 {
    margin: 0;
    font-size: var(--size-1);
    line-height: 140%;
  }

  a {
    text-decoration: none;
  }

  .cluster {
    --_cluster-space: var(--space-3xs);
  }

  // @ToDo: This is part of styling, and should be abstracted to theme.css
  .blog-card {
    border-radius: 8px;
    background-color: white;
    border: 1px solid transparent;
    box-shadow: var(--box-shadow-s);
  }

  .blog-card[featured] {
    box-shadow: var(--box-shadow-m);
  }
</style>
