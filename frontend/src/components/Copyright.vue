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

<style lang="scss" scoped>
p {
  color: #EFF8E2;
  margin-left: 73px;
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
}

// Media Query
@media screen and (max-width: 1350px) {
  p {
    margin-top: 10%;
  }
}

@media screen and (max-width: 1100px) {
  p {
    margin-top: 8%;
  }
}

@media screen and (max-width: 900px) {
  p {
    font-size: 20px;
  }
}

@media screen and (max-width: 640px) {
  p {
    margin-top: 4%;
    text-align: center;
    margin-left: 0px;
  }
}

@media screen and (max-width: 325px) {
  p {
    font-size: 18px;
  }
}
</style>
