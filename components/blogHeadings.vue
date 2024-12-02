<template>
  <hgroup class="headings | center">
    <div class="stack">
      <slot>
        <h3>Reboot Democracy</h3>
        <h1>Blog</h1>
        <h4>
          The Reboot Democracy Blog explores the complex relationship among AI,
          democracy and governance.
        </h4>
      </slot>
    </div>
  </hgroup>
</template>

<script setup></script>

<style lang="scss" scoped>
  .headings {
    box-sizing: border-box;
    padding-inline: var(--base-padding-inline);
    color: inherit;
    --_headings-text-color: var(--base-color);

    h3 {
      font-size: var(--size-1);
      color: var(--_headings-text-color);
    }

    h1 {
      font-size: var(--size-3);
      color: var(--_headings-text-color);
    }

    h4 {
      font-weight: 300;
      color: var(--_headings-text-color);
    }

    .stack {
      --_stack-space: var(--space-2xs);
    }
  }
</style>
