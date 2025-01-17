<template>
  <main>
    <blog-hero :title="tagTitle" >
      <nuxt-link class="button" visual="unstyled" to="/updates" icon="arrow_back">Back to Blog</nuxt-link>
      <featured-blog-section :loop="true" layout="reel" :items="data.featuredItems.slice(0, 4)"></featured-blog-section>
    </blog-hero>
    <blog-partners :logos="projectConfig.project_partners" />
    <blog-post-list :content="data.items" class="margin-bottom:xl-2xl"/>
  </main>
</template>

<script setup>
  import projectConfig from '../../project_config.json';
  useHead({
      title: 'Blog Template',
      meta: [
          { name: 'description', content: 'Blog Template' },
          { property: 'og:site_name',  content: 'Blog Template'},
          { property: 'og:title',  content: 'Blog Template'},
          { property: 'og:description', content: 'Blog Template' },
          { property: 'og:image',  content: '/images/default.png'},
          { property: 'og:image:alt',  content: 'Blog Template'},
          { name: 'twitter:image',  content: '/images/default.png'},
          { name: 'twitter:image:alt',  content: 'Blog Template'},
          { name: 'twitter:description', content: 'Blog Template' },
      ]
  })

const route = useRoute()
const blog = await queryContent('blogposts').where({ 'array_of_tag_slug': {
  $contains: route.params.slug
} }).sort({ date: -1 }).find()

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const data = reactive({
    items: [],
    featuredItems: []
});

const tags = blog.map(post => post.tags).flat()
const tagTitle = tags.find(tag => tag.tag_slug === route.params.slug).tag_label

watchEffect(() => {
  // Reorder the items array based on the date attribute
  data.items.sort((a, b) => b.stringDate.localeCompare(a.stringDate));
});

blog.forEach(post => {
  let item = {
    slug: post.slug,
    brow: post.brow,
    title: post.title,
    description: post.excerpt,
    actionLabel: 'Read more',
    tags: post.tags,
    url: `/updates/${post.slug}`,
    date: '',
    stringDate: post.date,
    featured: post.featured
  }

  const dateParts = item.stringDate.split("-");
  const dateObj = new Date(parseInt(dateParts[0]), (parseInt(dateParts[1]) - 1), parseInt(dateParts[2]));
  item.date = ` ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

  data.items.push(item);

  if(item.featured) {
    data.featuredItems.push(item)
  }
});
</script>

<style scoped lang="scss">
  .grid {
    --base-grid-width: 300px;
  }
</style>
