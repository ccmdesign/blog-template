<template>
    <main>
      <div class="center">
        <nuxt-link to="/updates">Back to Blog</nuxt-link>
        <img :src="data.blog.cover_image" alt="">
        <h1>{{ data.blog.title }}</h1>
        <p class="hero__tagline">{{ data.blog.meta }}</p>
        <div v-html="data.blog.main_content"></div>
      </div>
    </main> 
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const route = useRoute()

    const blogData = await queryContent('blogposts').where({
        slug: route.params.slug
    }).find();
    const data = reactive({
        blog: blogData[0]
    });
    
    useHead({
        title: 'BlogTemplate | '+blogData[0].title,
        meta: [
            { name: 'description', content: blogData[0].excerpt },
            { property: 'og:site_name',  content: 'Blog Template'},
            { property: 'og:title',  content: 'Blog Template | '+blogData[0].title},
            { property: 'og:description', content: blogData[0].excerpt },
            { property: 'og:image',  content: blogData[0].cover_image},
            { property: 'og:image:alt',  content: 'Blog Template'},
            { name: 'twitter:image',  content: blogData[0].cover_image},
            { name: 'twitter:image:alt',  content: 'Blog Template'},
            { name: 'twitter:description', content: blogData[0].excerpt },
        ]
    })

    const dateParts = data.blog.date.split("-");
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    data.blog.date = new Date(parseInt(dateParts[0]), (parseInt(dateParts[1]) - 1), parseInt(dateParts[2]));

    data.blog.meta = `by ${data.blog.author?data.blog.author:'Blog Template'} • ${months[data.blog.date.getMonth()]} ${data.blog.date.getDate()}, ${data.blog.date.getFullYear()}`

    const currentUrl = ref('');
    onMounted(() => {
        currentUrl.value = window.location.href;
    });

    function joinArray(array) {
        if (array.length === 0) {
            return ''; // Return an empty string for an empty array
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

<style lang="scss" scoped>
    
</style>
