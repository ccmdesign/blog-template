<template>
  <div class="blog-card" :content="content">
    <div v-if="content.featured" class="featured">FEATURED</div>
    <slot>
      <div class="stack" >
        <img src="" alt="">
        <h4>{{ content.brow }}</h4>
        <h3><nuxt-link :to="content.url">{{ content.title }}</nuxt-link></h3>
        <nuxt-link :to="content.url">
          <base-button>{{ content.actionLabel }}</base-button>
        </nuxt-link>
        <h4>Tags</h4>
        <div class="cluster">
          <nuxt-link v-for="tag in content.tags" :to="`/updates/tags/${tag.tag_slug}`">
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
      brow: '',
      title: '',
      actionLabel: 'Read more',
      tags: [],
      url: '',
    })
  }
});

</script>

<style lang="scss" scoped>
.blog-card {
  border: 1px solid var(--base-color);
  padding-block: var(--card-padding-block);
  padding-inline: var(--card-padding-inline);
  position: relative;
  
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
    color: white;
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
