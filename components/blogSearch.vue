<template>
  <fieldset class="search">
    <input type="search" />
    <input type="submit" />
  </fieldset>
</template>

<script setup></script>

<style lang="scss" scoped>
  .search {
    --_search-border-radius: var(--base-border-radius);
    --_search-padding: 0.5rem;
  }

  // Structure
  .search {
    display: flex;
    align-items: stretch;
  }

  input[type="search"] {
    // padding: 1rem;
  }

  // Skin
  .search * {
    border: 0;
    padding: var(--_search-padding);
  }

  input[type="search"] {
    border-radius: var(--_search-border-radius) 0 0 var(--_search-border-radius);
  }

  input[type="submit"] {
    border-radius: 0 var(--_search-border-radius) var(--_search-border-radius) 0;
  }
</style>
