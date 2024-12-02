<template>
  <div class="announcement">
    <p>
      <strong>{{ announcement.title }}</strong> {{ announcement.text }}
    </p>
  </div>
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
    --_announcement-text-color: var(--white-color);
    --_announcement-title-color: var(--white-color);
    --_announcement-bg: rgba(0, 0, 0, 0.3);
  }

  .announcement {
    padding-inline: var(--base-padding-inline);
    padding-block: var(--base-padding-block);
    display: flex;
    align-items: center;
    color: var(--_announcement-text-color);
    background-color: var(--_announcement-bg);
  }

  p {
    margin: 0;
    text-align: center;
    width: 100%;
    max-width: none;
  }

  strong {
    color: var(--_announcement-title-color);
  }
</style>
