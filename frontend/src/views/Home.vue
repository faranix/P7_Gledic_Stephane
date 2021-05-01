<template>
  <div class="home">
    <div class="home__left">
      <img class="home__left__img" src="@/assets/svg/icon-left-font-monochrome-white.svg" alt="">
      <MenuHome 
        :pseudo='pseudo'
      />
    </div>
    <div class="home__right">
      <!-- Overlay pour crée un nouveau post -->
      <Overlay 
        :formSend='newPost'
        :postId='postId'
        nameBtn='Envoyer'
        :overlay='overlay'
        :closeOverlay='closeOverlay'
      />

      <div @click="overlay = 1" class="nouvellepublication">Que souhaitez vous publiez ?</div>

      <Posts />

    </div>
  </div>
</template>

<script>
import MenuHome from '@/components/MenuHome.vue';
import Posts from '@/components/Posts.vue';
import Overlay from '@/components/Overlay.vue';

export default {
  name: 'Home',
  components: {
    MenuHome, Posts, Overlay
  },
  data() {
    return {
      email: 'email@gmail.com',
      pseudo: 'pseudo',
      overlay: 0,
      postId: 1,
    }
  },
  methods: {
    /**
     * Creation d'un nouveau post
     */
    newPost() {
      const form = document.querySelector('#formPublier');
      const userId = JSON.parse(localStorage.getItem('user')).id
      let post = [userId];

      form.forEach(element => {
        // Verifie que les champs son remplie
        if (element.value == '') {
          element = false;
        }
        JSON.stringify(post.push(element.value));
      });

      if (post[1] == undefined || post[2] == undefined) {
        console.log('Veuillez remplir tout les champs !');
      } else {
        // Envoie des données au backend
        fetch('http://localhost:3000/api/connect/createpost', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(post)
        })
        .then(res => {
          res.json().then(() => {
            this.overlay = 0;
            window.location.reload();
          })
        })
        .catch(error => {
          console.log(error);
        })
      }
    },

    closeOverlay() {
      this.overlay = 0;
    }
  },
  mounted() {
    // Verification du token grace au headers et récuperation des données dans le localStorage
    fetch('http://localhost:3000/api/connect', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        // Verifie si utilisateur est bien connecter
        if (res.status == 200) {
            const user = JSON.parse(localStorage.getItem('user'));
            // Stock les données reçu dans les data de vuejs
            this.email = user.email;
            this.pseudo = user.pseudo;
            this.id = user.id;

        } else {
          // Sinon le ramene sur la page d'acceuil
          window.location.href = 'http://localhost:8080/#/';
        }
      })
      .catch(error => console.log(error));
  }
}
</script>

<style lang='scss' scoped>
  .home {
    display: flex;
    height: 100%;
    background-color: #573280;

    &__left {
      position: fixed;
      &__img {
        padding: 25px;
        width: 290px;
        height: 121px;
        margin-bottom: -4px;
        border-right: solid 1px #23022E;
        border-bottom: solid 1px #23022E;
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      padding: 20px 10% 20px 30%;
      width: 100%;
      height: 100%;
      background-color: #573280;

      .nouvellepublication {
        padding: 20px;
        margin-bottom: 30px;
        background-color: #23022E;
        color: #EFF8E2;
        align-self: center;
        cursor: pointer;
      }
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