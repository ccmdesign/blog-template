<template>
  <blog-hero />
  <main>
    <featured-blog-section>
      <featured-blog-card
        v-for="item in data.featuredItems"
        :key="`featured-${item.slug}`"
        :content="item" />
    </featured-blog-section>

    <blog-section>
      <div class="center">
        <h2>All posts</h2>
        <ul class="grid" role="list">
          <blog-card
            v-for="item in data.items"
            v-bind:key="item.slug"
            :content="item" />
        </ul>
      </div>
    </blog-section>
  </main>
  <blog-footer />
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
  const blog = await queryContent("blogposts").find();

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

  watchEffect(() => {
    // Reorder the items array based on the date attribute
    data.items.sort((a, b) => b.stringDate.localeCompare(a.stringDate));
  });

  blog.forEach((post) => {
    let item = {
      slug: post.slug,
      brow: post.brow,
      title: post.title,
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

    data.items.push(item);

    if (item.featured) {
      data.featuredItems.push(item);
    }
  });
</script>

<style scoped lang="scss"></style>
