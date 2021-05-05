<template>
  <div class="navlogin">
    <div class="navlogin__logo">
      <img src="@/assets/svg/icon.svg" alt="" id="logoRotate">
      <img
        src="@/assets/svg/icon-left-font-monochrome-white.svg"
        alt="Le logo de groupomania"
      />
    </div>
      <div class="navlogin__nav">
        <router-link class="navlogin__nav__router" id="router-1" to="/"
          >Connexion</router-link
        >
        <router-link class="navlogin__nav__router" id="router-2" to="/inscription"
          >Inscription</router-link
        >
      </div>
  </div>
</template>

<script>
export default {
  name: "NavLogin",
};
</script>

<style lang="scss" scoped>
  .navlogin {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;

    &__nav {
      display: flex;
      justify-content: space-between;
      width: 300px;
    }

    a {
      text-decoration: none;
      color: #150E0E;
      font-weight: bold;
      font-size: 1.5rem;

      &:hover {
        color: #573280;
        text-decoration: underline #150E0E;
        transition: color 300ms ease-in-out;
      }
    }

    #logoRotate {
      width: 80px;
      margin-right: -50px;
      margin-top: -50px;
    }

    img {
      width: 60%;
    }
  }
</style>
