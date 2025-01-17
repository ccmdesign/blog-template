<template>
  <section class="blog-nav">
    <div class="blog-nav__content">
      <slot name="logo">
        <nuxt-link to="/">
          <div class="logo">Reboot Democracy</div>
        </nuxt-link>
      </slot>

      <base-button
        popovertarget="menu-mobile"
        class="blog-nav__menu-trigger"
        icon="menu"
        visual="unstyled"></base-button>

      <nav class="cluster">
        <template v-for="route in routes" :key="route.path || route.url">
          <nuxt-link 
            v-if="route.path" 
            class="button" 
            :visual="route.visual || 'unstyled'" 
            :color="route.color || 'default'" 
            :to="route.path">
            {{ route.name || route.path }}
          </nuxt-link>
          <a 
            v-else-if="route.url" 
            class="button" 
            :visual="route.visual || 'unstyled'" 
            :color="route.color || 'default'" 
            :href="route.url" 
            target="_blank">
            {{ route.name || route.url }}
          </a>
        </template>
        
        <slot name="menu-extra">
          <a class="button" visual="primary" color="primary" href="#">Signup</a>
        </slot>
      </nav>

      <div popover id="menu-mobile" class="menu-mobile">
        <nav class="stack">
          <template v-for="route in routes" :key="route.path || route.url">
            <nuxt-link 
              v-if="route.path" 
              class="button" 
              :visual="route.visual || 'unstyled'" 
              :color="route.color || ''" 
              :to="route.path">
              {{ route.name || route.path }}
            </nuxt-link>
            <a 
              v-else-if="route.url" 
              class="button" 
              :visual="route.visual || 'unstyled'" 
              :color="route.color || ''" 
              :href="route.url" 
              target="_blank">
              {{ route.name || route.url }}
            </a>
          </template>
          
          <slot name="mobile-extra">
            <blog-search class="blog-nav__search" />  
          </slot>
        </nav>
      </div>

      <slot name="nav-right">
        <blog-search class="blog-nav__search" />
      </slot>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

import projectConfig from '../project_config.json';

const router = useRouter();
const routes = projectConfig.main_menu && Array.isArray(projectConfig.main_menu) && projectConfig.main_menu.length > 0
  ? projectConfig.main_menu
  : router.getRoutes().filter(route => route.path.split('/').length === 2);

</script>

<style lang="scss" scoped>
  .blog-nav {
    --_nav-color: var(--nav-color);
    --_nav-background-color: var(--nav-background-color);
    --_nav-mobile-background-color: var(--nav-mobile-background-color);
    --_nav-padding-block: var(--nav-padding-block);
  }

  // Structure
  .blog-nav__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: var(--base-padding-inline);
  }

  .blog-nav {
    * { color: inherit; }
    .button { text-transform: capitalize; }
  }

  .menu-mobile {
    inset: unset;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    width: 80%;
    height: 90%;
    border: none;
    align-items: center;
    justify-content: center;
    
    .button {
      align-self: center;
    }
  }

  .menu-mobile:popover-open {
    display: flex;
  }

  @media screen and (max-width: 1450px) {
    .blog-nav { flex-direction: column; }

    .cluster,
    .blog-nav__search { display: none; }
  }

  @media screen and (min-width: 1450px) {
    .blog-nav { justify-content: space-between; }
    .blog-nav__menu-trigger { display: none; }

    #menu-mobile { display: none; }
  }

  // Style
  .blog-nav,
  .menu-mobile {
    padding-block: var(--_nav-padding-block);
    color: var(--_nav-color);
    background-color: var(--_nav-background-color);
  }

  .menu-mobile {
    box-shadow: var(--box-shadow-l);
    background-color: var(--_nav-mobile-background-color);
  }
</style>
