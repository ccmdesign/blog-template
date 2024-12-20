<template>
  <section class="blog-nav">
    <div class="blog-nav__content">
      <nuxt-link to="/">
        <div class="logo">Reboot Democracy</div>
      </nuxt-link>

      <base-button
        class="blog-nav__menu-trigger"
        icon="menu"
        visual="unstyled"></base-button>

      <nav class="cluster">
        <nuxt-link class="button" visual="unstyled" v-for="route in routes" :key="route.path" :to="route.path">{{ route.name || route.path }}</nuxt-link>
        <a class="button" visual="primary" color="accent" href="#">Signup</a>
      </nav>

      <blog-search class="blog-nav__search" />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.getRoutes().filter(route => route.path.split('/').length === 2);

console.log('Available First Level Routes:', routes);
</script>

<style lang="scss" scoped>
  // Structure
  .blog-nav__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: var(--base-padding-inline);
  }

  @media screen and (max-width: 600px) {
    .blog-nav {
      flex-direction: column;
    }

    .cluster,
    .blog-nav__search {
      display: none;
    }
  }

  @media screen and (min-width: 600px) {
    .blog-nav {
      justify-content: space-between;
    }

    .blog-nav__menu-trigger {
      display: none;
    }
  }

  // Style
  .blog-nav {
    color: var(--white-color);
    background-color: var(--base-color);

    * {
      color: inherit;
    }

    .button {
      text-transform: capitalize;
    }
  }
</style>
