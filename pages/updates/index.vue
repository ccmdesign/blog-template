<template>
  <main>
    <blog-hero :content="data.featuredItems.slice(0, 4)" />
    <blog-partners />
    <blog-post-list :content="data.items" />
  </main>
</template>

<script setup>
  useHead({
    title: "Blog Template",
    meta: [
      { name: "description", content: "Blog Template" },
      { property: "og:site_name", content: "Blog Template" },
      { property: "og:title", content: "Blog Template" },
      { property: "og:description", content: "Blog Template" },
      { property: "og:image", content: "/images/default.png" },
      { property: "og:image:alt", content: "Blog Template" },
      { name: "twitter:image", content: "/images/default.png" },
      { name: "twitter:image:alt", content: "Blog Template" },
      { name: "twitter:description", content: "Blog Template" },
    ],
  });
  const blog = await queryContent("blogposts").sort({ date: -1 }).find();

  console.log(34, blog);

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
