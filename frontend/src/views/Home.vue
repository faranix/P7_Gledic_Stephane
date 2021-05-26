<template>
  <div class="home">
    <div class="home__left">
      <img class="home__left__img" src="@/assets/svg/icon-left-font-monochrome-black.svg" alt="">
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
        :errorMessage='errorMessage'
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
import PostService from '@/service/PostService.js';

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
      errorMessage: undefined,
      postService: new PostService
    }
  },
  methods: {
    /**
     * Permet de crée un nouveau post
     */
    newPost() {
      let url = document.querySelector('#url').value;
      const regex = '(?:jpg|gif|png)'

      if (url.match(regex) == null) {
        this.errorMessage = 'Url invalide !';
      } else {
        this.postService.newPost();
        this.overlay = 0;
        // permet d'utiliser la methods getPosts de l'enfants
        this.$children[2].getPosts();
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
  },
}
</script>
