<template>
  <p class="announcement">
    <strong>{{ announcement.title }}</strong>
    {{ announcement.text }}
  </p>
</template>

<script setup>
  const props = defineProps({
    announcement: {
      type: Object,
      default: () => ({
        title: "Default Title",
        text: "Default text for the announcement.",
      }),
    },
  });
</script>

<style lang="scss" scoped>
  .announcement {
    --_annoucement-text-color: red;
    --_annoucement-title-color: var(--base-color);
  }

  .announcement {
    padding-inline: var(--base-padding-inline);
    padding-block: var(--base-padding-block);
    color: var(--_announcement-text-color);
  }

  strong {
    color: var(--_announcement-title-color);
  }
</style>
