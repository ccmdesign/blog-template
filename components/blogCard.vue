<template>
  <div class="blog-card" :content="content">
    <slot>
      <div class="stack">
        <img src="" alt="">
        <h4>{{ content.brow }}</h4>
        <h3><nuxt-link :to="content.url">{{ content.title }}</nuxt-link></h3>
        <div>
          <base-button :to="content.url">{{ content.actionLabel }}</base-button>
        </div>
        <h4>Tags</h4>
        <div class="cluster">
          <blog-chip v-for="i in content.tags">{{ i }}</blog-chip>
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
  
  > * {
    --_stack-space: var(--space-xs);
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
