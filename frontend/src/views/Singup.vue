<template>
  <div class="singup">
    <div class="singup__box">
      <NavLogin title="Inscription" />


      <form class="form" method="post">
        <div class="form__box">
          <label for="pseudo">Pseudo</label>
          <input type="text" name="pseudo" id="pseudo" required />
        </div>
        <div class="form__box">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div class="form__box">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div class="error-message">{{ errorMessage }}</div>
        <button @click="createUser()" type="button">
          <span>V</span>
        </button>
      </form>

      <Copyright />
    </div>
  </div>
</template>

<script>
import NavLogin from "@/components/NavLogin.vue";
import Copyright from "@/components/Copyright.vue";

export default {
  name: "Singup",
  components: {
    NavLogin, Copyright
  },
  data() {
    return {
      errorMessage: undefined,
    }
  },
  methods: {
    /**
     * Permet de poster les donnees saisie par utilisateur
     */
    createUser() {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const pseudo = document.querySelector('#pseudo').value;

      let user = {
        email: email,
        password: password,
        pseudo: pseudo
      };

      // Verifie que utilisateur a bien remplie tout les champs
      if (user.email == '' || user.password == '' || user.pseudo == '') {
        user = {
          userVerifcation: false
        }
      }
      
      // Permet d'envoyer les information pour la creation d'un profil
      fetch('http://localhost:3000/api/inscription', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        if (res.status == 201) {
            window.location.href = 'http://localhost:8080/#/';
        } else {
          res.json().then(data => {
            this.errorMessage = data.message;
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
};
</script>
