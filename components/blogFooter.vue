<template>
  <footer :theme="theme">
    <div class="footer__grid">
      <section class="footer__logos | stack">
        <slot name="logos">
          <h5>Partners</h5>
          <a v-for="logo in partnersLogos" :key="logo.alt" :href="logo.url" target="_blank" rel="noopener noreferrer">
            <img :src="theme === 'light' ? logo.src_light : logo.src_dark" :alt="logo.alt" :style="{ maxWidth: logo.maxWidth }" />
          </a>
        </slot>
      </section>
      <section class="stack">
        <slot name="blurb">
          <h5>About Us</h5>
          <p>{{ footerBlurb }}</p>
        </slot>   
      </section>
      <section class="footer__links | stack">
        <slot name="links">
          <h5>Links</h5>
          <nav>
            <nuxt-link class="link" v-for="route in routes" :key="route.path" :to="route.path">
              {{ route.name || route.path }}
            </nuxt-link>
          </nav>
        </slot>   
      </section>
    </div>
  </footer>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import projectConfig from '../project_config.json';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark'
  }
});

const footerBlurb = computed(() => projectConfig.footer.about);
const partnersLogos = computed(() => projectConfig.project_partners);

const router = useRouter();
const routes = computed(() => {
  if (projectConfig.footer.links && Array.isArray(projectConfig.footer.links)) {
    return projectConfig.footer.links;
  }
  return router.getRoutes().filter(route => route.path.split('/').length === 2);
});
</script>

<style lang="scss" scoped>
  footer {
    --_footer-bg: var(--base-color);
    --_footer-color: var(--light-text-color);
    --_footer-padding: var(--section-padding-block);
  }

  footer {
    background-color: var(--_footer-bg);
    color: var(--_footer-color);
    padding-block: var(--_footer-padding);
    padding-inline: var(--space-l);
  }

  .footer__grid {
    display: grid;    
    gap: var(--space-xl);
    justify-content: space-between;

    @media screen and (min-width: 800px) {
      display: grid;
      grid-template-columns: minmax(200px, 300px) minmax(300px, 800px) minmax(200px, 250px);  
    }
  }

  .cluster {
    display: flex;
    gap: var(--base-gutter);
    justify-content: center;
  }

  .button {
    color: var(--_footer-color);
    text-decoration: none;
    text-transform: capitalize;
  }

  .footer__logos {
    * { --_stack-space: var(--space-l); }
    
  } 
  
  .footer__links {
    * { display: block; }
    
    nav { 
      display: flex;
      flex-direction: row;
      gap: var(--space-s);

      @media screen and (min-width: 800px) { flex-direction: column; }
    }
  } 
</style>
