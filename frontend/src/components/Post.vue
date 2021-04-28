<template>
  <div class="post">
      <div class="post__box">
          
      </div>

      <div class="post__commentaire">

      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    .post {
        display: flex;
        width: 70%;
        height: 400px;

        &__box {
            flex: 4;
            height: 100%;
            background-color: #383646;
            box-shadow:  inset -17px 0px 15px -11px rgba(0,0,0,0.62)
        }

        &__commentaire {
            flex: 2;
            height: 100%;
            background-color: #25242b;
        }
    }
</style>