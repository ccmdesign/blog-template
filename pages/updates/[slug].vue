<template>
  <blog-hero mini/>
  <div class="center">
    <article class="blogpost-layout">
      <header>
        <nuxt-link class="button" visual="unstyled" to="/updates" icon="arrow_back">Back to Blog</nuxt-link>
        <blog-headings :title="data.blog.title" :brow="data.blog.brow" :tagline="data.blog.tagline" class="post-headings"/>
        <p>{{ data.blog.meta }}</p>
      </header>
      
      <main>
        <img v-if="data.blog.cover_image" :src="data.blog.cover_image" alt="" />
        <div class="prose" v-html="data.blog.content"></div>
      </main>
      
      <aside>
        <audio controls>
          <source :src="data.blog.audio_version" type="audio/mpeg" />
          <a :href="data.blog.audio_version" download>Audio version</a>
        </audio>

        <ul class="stack | desktop-only" v-if="data.blog.authors.length">
          <li v-for="author in data.blog.authors" :key="author.name" class="author">
            <img :src="author.picture" :alt="author.name" class="author__image" />
            <p><a class="author__name" :href="author.bioLink" target="_blank">{{ author.name }} {{ author.lastName }}</a></p>
            <p>{{ author.title }}</p>
          </li>
        </ul>
        
        <ul v-if="data.blog.tags && data.blog.tags.length">
          <li v-for="i in data.blog.tags" style="padding-bottom: 1rem;">
            <blog-chip 
              :key="i.tag_slug" 
              :path="i.tag_slug" 
              :label="i.tag_label"
            />
          </li>
        </ul>
      </aside>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  .blogpost-layout {
    padding-inline: var(--space-xs-s);
    max-width: 100ch;
    margin-inline: auto;
    gap: var(--space-s-m);
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr; 
    grid-template-areas: "header" "sidebar" "main";

    @media screen and (min-width: 800px) {
      grid-template-rows: auto auto;
      grid-template-columns: 1fr minmax(280px, 350px);
      grid-template-areas: "header header" "main sidebar";
    }
  }

  header { grid-area: header; }
  .post-headings { padding-top: var(--space-s-m); }

  main, 
  aside {
    @media screen and (min-width: 800px) { padding-block: var(--space-l-xl); }
  }

  main { 
    grid-area: main; 
    padding-bottom: var(--space-l-xl);
  }
  aside { 
    grid-area: sidebar; 

    audio { width: 100%; }
  }

  .stack {
    padding: 0;
    * { --_stack-space: var(--space-m-l); }
  }

  .author {
    align-self: center;
    text-align: center;
    list-style: none;

    p { margin: 0; }
  }

  .author__name {

  }

  .author__image {
    border-radius: 200px;
    aspect-ratio: 1;
    max-width: 180px;
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

  // data.blog.authors = [
  //   {
  //     name: "Beth Simone Noveck",
  //     avatar: "/images/beth.jpg",
  //   },
  //   {
  //     name: "Autumn Sloboda",
  //     avatar: "/images/autumn.jpg",
  //   }
  // ]

if (Array.isArray(data.blog.authors) && data.blog.authors.length > 0) {
  const authorNames = data.blog.authors.map(author => author.name);
  const formattedAuthorNames = authorNames.length > 1 
    ? authorNames.slice(0, -1).join(", ") + " and " + authorNames.slice(-1)
    : authorNames[0];
  data.blog.meta = `By ${formattedAuthorNames} on ${months[data.blog.date.getMonth()]} ${data.blog.date.getDate()}, ${data.blog.date.getFullYear()}`;
} else {
  data.blog.meta = `By Blog Template • ${months[data.blog.date.getMonth()]} ${data.blog.date.getDate()}, ${data.blog.date.getFullYear()}`;
}

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
