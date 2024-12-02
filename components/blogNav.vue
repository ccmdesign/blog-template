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
        <nuxt-link class="button" visual="unstyled" to="/updates"
          >Blog</nuxt-link
        >
        <a class="button" visual="unstyled" href="#">About</a>
        <a class="button" visual="unstyled" href="#">Events</a>
        <a class="button" visual="unstyled" href="#">Our Work</a>
        <a class="button" visual="unstyled" href-="#">Contact</a>
        <a class="button" href-="#">Signup</a>
      </nav>

      <blog-search class="blog-nav__search" />
    </div>
  </section>
</template>

<script setup></script>

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
  }
</style>
