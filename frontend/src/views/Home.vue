<template>
  <div class="home">
    <div class="home__left">
      <img class="home__left__img" src="@/assets/svg/icon-left-font-monochrome-white.svg" alt="">
      <NavHome 
        :pseudo='pseudo'
      />
    </div>
    <div class="home__right">
      <Post />
      <br>
      <Post />
      <br>
      <Post />
    </div>
  </div>
</template>

<script>
import NavHome from '@/components/NavHome.vue';
import Post from '@/components/Post.vue';

export default {
  name: 'Home',
  components: {
    NavHome, Post
  },
  data() {
    return {
      email: 'email@gmail.com',
      pseudo: 'pseudo',
      id: 0,
    }
  },
  mounted() {
    // Recuperation des informations grace a userId
    fetch('http://localhost:3000/api/connect', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
      }
    })
      .then(res => {
        // Verifie si utilisateur est bien connecter
        if (res.status == 200) {
          res.json().then(data => {
            // Stock les données reçu dans les data de vuejs
            this.email = data.email;
            this.pseudo = data.pseudo;
            this.id = data.id;
          })
        } else {
          // Sinon le ramene sur la page d'acceuil
          window.location.href = 'http://localhost:8080/#/';
        }
      })
      .catch(error => console.log(error));
  },
}
</script>

<style lang='scss' scoped>
  .home {
    display: flex;
    &__left {
      position: fixed;
      &__img {
        padding: 25px;
        background-color: #573280;
        width: 290px;
        height: 121px;
        margin-bottom: -4px;
        border-right: solid 1px #23022E;
        border-bottom: solid 1px #23022E;
      }
    }

    &__right {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      padding: 20px;
      padding-right: 10%;
      width: 100%;
      height: 100%;
      background-color: #573280;
    }
  }

  // Keyframe

  @keyframes logoAnim {
    0% {
      transform: rotate(50%);
    }

    100% {
      transform: rotate(100%);
    }
  }
</style>