<template>
  <main>
    <blog-hero title="Updates" >
      <featured-blog-section :loop="true" layout="reel" :items="data.featuredItems.slice(0, 5)"></featured-blog-section>
    </blog-hero>
    <blog-partners :logos="projectConfig.project_partners" />
    <blog-post-list :content="data.items" class="margin-bottom:xl-2xl"/>
  </main>
</template>

<script setup>
  import projectConfig from '../../project_config.json';

  useHead({
    title: "Blog Template",
    meta: [
      { name: "description", content: projectConfig.description },
      { property: "og:site_name", content: projectConfig.title },
      { property: "og:title", content: projectConfig.title },
      { property: "og:description", content: projectConfig.description },
      { property: "og:image", content: projectConfig.image || "/images/default.png" },
      { property: "og:image:alt", content: projectConfig.title },
      { name: "twitter:image", content: projectConfig.image || "/images/default.png" },
      { name: "twitter:image:alt", content: projectConfig.title },
      { name: "twitter:description", content: projectConfig.description },
    ],
  });
  const blog = await queryContent("blogposts").sort({ date: -1 }).find();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = reactive({
    items: [],
    featuredItems: [],
  });

  blog.forEach((post) => {
    let item = {
      slug: post.slug,
      brow: post.brow,
      title: post.title,
      tagline: post.tagline,
      description: post.excerpt,
      actionLabel: "Read more",
      tags: post.tags,
      url: `/updates/${post.slug}`,
      date: "",
      stringDate: post.date,
      featured: post.featured,
    };

    const dateParts = item.stringDate.split("-");
    const dateObj = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );
    item.date = ` ${
      months[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    if (!item.featured) {
      data.items.push(item);
    }

    if (item.featured) {
      data.featuredItems.push(item);
    }
  });
</script>

<style scoped lang="scss">
  .grid {
    --base-grid-width: 300px;
  }
</style>
