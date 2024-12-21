<template>
  <fieldset class="search form-group">
    <input type="search" />
    <input class="button" type="submit" visual="primary" color="accent"/>
  </fieldset>
</template>

<script setup></script>

<style lang="scss" scoped>
  .search {
    --_search-border-radius: var(--base-border-radius);
    --_search-padding: 0.5rem;
    --_search-background-color: var(--search-background-color); 
    --_search-focus-background-color: var(--search-focus-background-color); 
    --_search-padding-inline: var(--search-padding-inline); 
  }

  // Structure
  .search {
    border: unset;
    padding: unset;

    * { color: inherit; /* this allows the color from the nav component to be applied */}
  }

  .form-group {
    display: flex;
    align-items: stretch;
  }

  input[type="search"] {
    border: unset;
    outline: unset;
  }

  
  input[type="search"]:focus {
    border: unset;
    background-color: var(--_search-focus-background-color);
  }

  // Skin
  input[type="search"] {
    background-color: var(--_search-background-color);
    padding-inline: var(--_search-padding-inline);
    border-radius: var(--_search-border-radius) 0 0 var(--_search-border-radius);
  }

  input[type="submit"] {
    border-radius: 0 var(--_search-border-radius) var(--_search-border-radius) 0;
  }
</style>
