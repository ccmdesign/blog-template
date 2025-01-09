<template>
  <section class="featured-posts" :layout="layout">
    <ul class="reel overflowing" role="list">
      <blog-card v-for="card in items" v-bind:key="card" :content="card"></blog-card>
    </ul>
    <ul class="reel-markers">
      <li class="reel-markers__marker" :class="{}" v-for="(marker, i) in items" v-bind:key="marker" aria-hidden="true">
        <button class="reel-markers__button" @click="goTo(i)" :class="{'reel-markers__button--active': data.currentPosition == i}"></button>
      </li>
    </ul>
  </section>
</template>

<script setup>
  import { watch, onMounted, onUnmounted, ref, reactive } from 'vue';

  const props = defineProps({
    layout: {
      type: String,
      default: "default",
    },
    loop: {
      type: Boolean,
      default: false,
    },
    loopInterval: {
      type: String,
      default: '3000',
    },
    items: {
      type: Array,
      default: [
        {
          brow: "",
          title: "",
          actionLabel: "Read more",
          tags: [],
          url: "",
        },
        {
          brow: "",
          title: "",
          actionLabel: "Read more",
          tags: [],
          url: "",
        },
        {
          brow: "",
          title: "",
          actionLabel: "Read more",
          tags: [],
          url: "",
        },
        {
          brow: "",
          title: "",
          actionLabel: "Read more",
          tags: [],
          url: "",
        },
        {
          brow: "",
          title: "",
          actionLabel: "Read more",
          tags: [],
          url: "",
        },
        {
          brow: "",
          title: "",
          actionLabel: "Read more",
          tags: [],
          url: "",
        },
      ]
    }
  });

  const data = reactive({
    currentPosition: 0,
  });

  const isScrollingProgrammatically = ref(false);

  const goTo = (pos) => {
    if (data.currentPosition != pos) {
      data.currentPosition = pos;
    }
  };

  const scrollIntoPosition = (pos) => {
    const reel = document.querySelector('.reel');
    if (reel) {
      const children = reel.children;
      if (pos >= 0 && pos < children.length) {
        const targetElement = children[pos];
        isScrollingProgrammatically.value = true;
        reel.scrollTo({
          left: targetElement.offsetLeft,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isScrollingProgrammatically.value = false;
        }, 300); // Ajuste o tempo conforme necessário
      }
    }
  };

  const updateCurrentPosition = () => {
    if (isScrollingProgrammatically.value) return;

    const reel = document.querySelector('.reel');
    if (reel) {
      const children = Array.from(reel.children);
      const scrollLeft = reel.scrollLeft;
      const childWidth = children[0].offsetWidth;

      // Calcula a posição atual com base na rolagem
      const newPosition = Math.round(scrollLeft / childWidth);
      if (Math.abs(scrollLeft - newPosition * childWidth) < childWidth / 2) {
        if (newPosition !== data.currentPosition) {
          data.currentPosition = newPosition;
        }
      }
    }
  };

  watch(() => data.currentPosition, (newPos) => {
    scrollIntoPosition(newPos);
  });

  // Função para avançar para o próximo item
  const next = () => {
    data.currentPosition = (data.currentPosition + 1) % props.items.length;
  };

  // Função para voltar para o item anterior
  const previous = () => {
    data.currentPosition = (data.currentPosition - 1 + props.items.length) % props.items.length;
  };

  const intervalId = ref(null);

  const startLoop = () => {
    if (props.loop) {
      window.setInterval(() => {
        next();
      }, parseInt(props.loopInterval));
    }
  };

  const stopLoop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };

  onMounted(() => {
    const reel = document.querySelector('.reel');
    if (reel) {
      reel.addEventListener('scroll', updateCurrentPosition);
    }
    startLoop();
  });

  onUnmounted(() => {
    const reel = document.querySelector('.reel');
    if (reel) {
      reel.removeEventListener('scroll', updateCurrentPosition);
    }
    stopLoop();
  });
</script>

<style lang="scss" scoped>
  section {
    --_featured-posts-bg: transparent;
    --_featured-posts-color: var(--base-color);
    --_featured-posts-padding: var(--section-padding-block);
    --_featured-posts-padding-left: var(--size-2);
    --_featured-posts-snap-align: start; 
    --_featured-posts-marker-justify: center;
    --_featured-posts-marker-color: var(--base-color-25-alpha);
    --_featured-posts-marker-size: var(--size--2);
    --_featured-posts-marker-radius: var(--size--1);
  }

  section {
    background: linear-gradient(
      to bottom,
      var(--_featured-posts-bg) 0%,
      var(--_featured-posts-bg) 50%,
      var(--white-color) 50%,
      var(--white-color) 100%
    );

    color: var(--_featured-posts-color);
  }

.featured-posts {
  overflow-x: hidden;
  width: 100%;
}

  .featured-posts[layout="reel"] {
    padding-bottom: var(--_featured-posts-padding);
    .reel > :first-child{
      margin-left: var(--_featured-posts-padding-left);
    }
  }

  @media screen and (max-width: 768px) {
    .featured-posts[layout="reel"] {
      .reel > :deep(:first-child) {
        margin-left: var(--space-2xs);
      }
      .reel > :deep(*) {
        width: 100%;
        max-width: 80svw;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .featured-posts[layout="reel"] {
      .reel > :deep(:first-child) {
        margin-left: var(--space-2xl);
      }
    }
  }

  ul {
    margin: 0;
  }

  .reel {
    scroll-snap-type: x mandatory;
    overflow-x: auto; // Permite a rolagem
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
      display: none; // Chrome, Safari e Edge
    }
    @media screen and (max-width: 768px) {
      overflow-x: auto;
    }
  }

  // This controls the width of the reel card
  .reel > :deep(*) {
    width: 100%;
    max-width: 600px;
    scroll-snap-align: var(--_featured-posts-snap-align);
  }

  .reel-markers {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: var(--size-0);
    justify-content: var(--_featured-posts-marker-justify);
    @media screen and (max-width: 768px) {
      display: none;
    }
  }

    .reel-markers__marker {
      list-style: none;
    }

      .reel-markers__button {
        height: var(--_featured-posts-marker-size);
        width: var(--_featured-posts-marker-size);
        border: none;
        border-radius: var(--_featured-posts-marker-radius);
        background-color: var(--_featured-posts-marker-color);
        cursor: pointer;
        transition: width 0.2s ease-in-out;
        outline: none;
      }

      .reel-markers__button--active {
        width: calc(var(--_featured-posts-marker-size) * 3);
        cursor: default;
        pointer-events: none;
      }
</style>
