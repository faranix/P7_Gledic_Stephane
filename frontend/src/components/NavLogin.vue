<template>
  <div class="navlogin">
    <div class="navlogin__header">
      <h1 class="navlogin__header__title">{{ title }}</h1>
      <img
        src="@/assets/svg/icon-left-font-monochrome-white.svg"
        alt="Le logo de groupomania"
      />
      <div class="nav">
        <router-link class="router" id="router-1" to="/"
          >Connexion</router-link
        >
        <router-link class="router" id="router-2" to="/inscription"
          >Inscription</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavLogin",
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.navlogin {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      color: #EFF8E2;
      font-size: 55px;
      margin: 60px 125px 0 109px;
      font-weight: bold italic;
    }
  }
}

.nav {
  margin-top: 80px;
}

img {
  width: 376px;
  margin-top: 30px;
  color: blue;
}

.router {
  text-decoration: none;
  color: #EFF8E2;
  font-size: 30px;
  font-weight: bold;
}

.router {
  &:hover {
    color: #23022E;
    transition: all 300ms;
  }
}

#router-1 {
  margin: 50px 0 0 61px;
  padding-bottom: -20px;
}

#router-2 {
  margin: 50px 84px 0 53px;
}

// Media Query
@media screen and (max-width: 1350px) {

  .navlogin__header {
    margin-top: 2%;
    &__title {
      font-size: 40px;
      margin: 60px 100px 0 70px;
    }
    
  }

  .router {
    font-size: 20px;
  }

  img {
    width: 200px;
  }
  
}

@media screen and (max-width: 900px) {
  .navlogin__header {
    margin-top: 0%;
    justify-content: space-around;
    &__title {
      font-size: 30px;
      margin: 60px 0px 0 0px;
    }
  }
  #router-1 {
    margin: 50px 0 0 0px;
    padding-bottom: -20px;
  }

  #router-2 {
    margin: 50px 0px 0 40px;
  }
  .router {
    font-size: 18px;
  }
}

@media screen and (max-width: 640px) {
  .navlogin__header {
    flex-direction: column;
    &__title {
      display: none;
    }

    .nav {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: 10px;
    }
  }
}

@media screen and (max-width: 425px) {
  .nav {
    margin-top: 15px;
  }
}
</style>
