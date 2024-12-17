<template>
  <div class="blog-card" :content="content">
    <slot>
      <div class="stack">
        <img src="" alt="" />
        <nuxt-link :to="content.url">
          <blog-headings :title="content.title" :brow="content.brow" :tagline="content.tagline"/>
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

        <nuxt-link :to="content.url">
          <base-button>{{ content.actionLabel }}</base-button>
        </nuxt-link>
        
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
