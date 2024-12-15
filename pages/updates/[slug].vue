<template>
  <blog-hero mini />
  <div class="center">
    <nuxt-link class="button" visual="unstyled" to="/updates">Back to Blog</nuxt-link>
  </div>

  <article class="blogpost-layout">
    <main>
      <blog-section>
        <blogpost-headings>
          <h3>This is a simulation of the brow</h3>
          <h2>{{ data.blog.title }}</h2>
          <h4>
            This is a simulation for the tagline lorem ipsum dolor sit, amet
            consectetur adipisicing elit modi temporibus necessitatibus totam
            sequi explicabo.
          </h4>
        </blogpost-headings>
      </blog-section>
      <blog-section>
        <div class="center">
          <!-- <img :src="data.blog.cover_image" alt="" /> -->
          <div class="prose" v-html="data.blog.content"></div>
        </div>
      </blog-section>
    </main>
    
    <aside>
      <audio controls>
        <source :src="data.blog.audio_version" type="audio/mpeg" />
        <a :href="data.blog.audio_version" download>Audio version</a>
      </audio>
      <ul>
        <li v-for="i in data.blog.tags">
          <blog-chip 
            v-for="tag in content.tags" 
            :key="tag.tag_slug" 
            :path="tag.tag_slug" 
            :label="tag.tag_label"
          />
        </li>
      </ul>
      <p>{{ data.blog.date }}</p>
    </aside>
  </article>
  <blog-footer />
</template>

<style lang="scss" scoped>
  .blogpost-layout {
    display: grid;
    grid-template-columns: 1fr minmax(280px, 350px);
    grid-template-areas: "main sidebar";
  }

  main {
    grid-area: main;
  }

  aside {
    grid-area: sidebar;
    padding: 1rem;
  }
</style>

<script setup>
  definePageMeta({
    layout: "default",
  });
  import { onMounted, ref } from "vue";

  const route = useRoute();

  const blogData = await queryContent("blogposts")
    .where({
      slug: route.params.slug,
    })
    .find();
  const data = reactive({
    blog: blogData[0],
  });

  useHead({
    title: "BlogTemplate | " + blogData[0].title,
    meta: [
      { name: "description", content: blogData[0].excerpt },
      { property: "og:site_name", content: "Blog Template" },
      { property: "og:title", content: "Blog Template | " + blogData[0].title },
      { property: "og:description", content: blogData[0].excerpt },
      { property: "og:image", content: blogData[0].cover_image },
      { property: "og:image:alt", content: "Blog Template" },
      { name: "twitter:image", content: blogData[0].cover_image },
      { name: "twitter:image:alt", content: "Blog Template" },
      { name: "twitter:description", content: blogData[0].excerpt },
    ],
  });

  const dateParts = data.blog.date.split("-");
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
  data.blog.date = new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );

  data.blog.meta = `by ${
    data.blog.author ? data.blog.author : "Blog Template"
  } • ${
    months[data.blog.date.getMonth()]
  } ${data.blog.date.getDate()}, ${data.blog.date.getFullYear()}`;

  const currentUrl = ref("");
  onMounted(() => {
    currentUrl.value = window.location.href;
  });

  function joinArray(array) {
    if (array.length === 0) {
      return ""; // Return an empty string for an empty array
    }

    if (array.length === 1) {
      return array[0].toString(); // Return the single element as string
    }

    if (array.length === 2) {
      return array.join(" and "); // Return the two items separated by " and "
    }

    const lastTwoItems = array.slice(-2); // Get the last two items from the array
    const otherItems = array.slice(0, -2); // Get all items except the last two

    return otherItems.join(", ") + ", " + lastTwoItems.join(", and ");
  }
</script>
