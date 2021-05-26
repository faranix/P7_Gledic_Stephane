<template>
  <div class="copyright">
    <p>{{ dateactuelle }}</p>
  </div>
</template>

<script>
export default {
  name: "Copyright",
  computed: {
    dateactuelle() {
      const date = new Date().getFullYear();

      return `Copyright by Groupomania ${date}`;
    },
  },
};
</script>

