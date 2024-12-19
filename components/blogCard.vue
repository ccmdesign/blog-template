<template>
  <div class="blog-card" :content="content">
    <slot>
      <div class="stack">
        <img src="" alt="" />
        <nuxt-link :to="content.url" class="blog-card__content">
          <blog-headings :title="content.title" :brow="content.brow" :tagline="content.tagline" clip="tagline"/>
        </nuxt-link>
        <div class="cluster">
          <blog-chip 
            v-for="tag in content.tags" 
            :key="tag.tag_slug" 
            :path="tag.tag_slug" 
            :label="tag.tag_label"
          />
        </div>
        <nuxt-link :to="content.url">
          <base-button color="primary">{{ content.actionLabel }}</base-button>
        </nuxt-link>
      </div>
    </slot>

    <!-- <pre>{{ content }}</pre> -->
  </div>
</template>

<script setup>
  defineProps({
    content: {
      type: Object,
      default: () => ({
        headings: {
          brow: "This is a static brow",
          title: "This is a static title",
          tagline: "Following criticism of Massachusetts' legislative opacity and a vote granting the state auditor oversight powers, my letter to the Globe argues we should adopt California's successful AI-driven legislative transparency model.",
        },
        actionLabel: "Read more",
        tags: ['test', 'test', 'test'],
        url: "",
      }),
    },
  });

  // const headings = {
  //   brow: content.brow,
  //   title: content.title,
  //   tagline: content.tagline,
  // };
</script>

<style lang="scss" scoped>
  .blog-card {
    --_card-padding-block: var(--card-padding-block);
    --_card-padding-inline: var(--card-padding-inline);

    padding: var(--_card-padding-block) var(--_card-padding-inline);
    position: relative;

    > * {
      --theme-stack-space: var(--space-xs);
    }
  }

  .blog-card__content {
    flex: 1;
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
    border-radius: 0 8px 8px 0;
    background-color: white;
    border: 1px solid transparent;
    box-shadow: var(--box-shadow-s);

    :before {
      height: 100%;
      content: "";
      background-color: var(--accent-color);
      width: 4px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .blog-card .stack {
    height: 100%;
  }

  .blog-card[featured] {
    box-shadow: var(--box-shadow-m);
  }
</style>
