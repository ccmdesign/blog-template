<template>
  <main>
    <blog-hero :horizontal="true" title="rebootdemocracy.ai" tagline="The Reboot Democracy Blog explores the complex relationship among AI, democracy and governance.">
      <featured-blog-section :loop="true" layout="reel" :items="data.featuredItems.slice(0, 4)"></featured-blog-section>
    </blog-hero>
  </main>
</template>

<script setup>
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

  if (item.featured) {
    data.featuredItems.push(item);
  }
});

</script>

<style scoped lang="scss"></style>
