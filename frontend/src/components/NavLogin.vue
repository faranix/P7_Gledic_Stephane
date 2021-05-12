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