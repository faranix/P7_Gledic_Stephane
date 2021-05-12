<template>
  <div class="login">
      <NavLogin
       title="Connexion"
        />


      <form class="form" method="post">
        <div class="form__box">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="form__box">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" id="password" />
        </div>
        <div class="error-message"></div>
        <button @click="loginUser()" type="button">
          <span>V</span>
        </button>
      </form>

      <Copyright />
  </div>
</template>

<script>
// @ is an alias to /src
import NavLogin from "@/components/NavLogin.vue";
import Copyright from "@/components/Copyright.vue";

// Importer des functions
const service = require('../service/service.js');

export default {
  name: "Login",
  components: {
    NavLogin,
    Copyright,
  },
  methods: {
    /**
     * Permet de poster les donnees saisie par utilisateur
     */
    loginUser() {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      const user = {
        email: email,
        password: password,
      }
      
      fetch('http://localhost:3000/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        if (res.status == 200) {
          res.json().then(data => {
            console.log(data);
            // Stock les données de user dans le localstorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = `http://localhost:8080/#/home`
          })
        } else {
          res.json().then(data => {
            service.showError(data)
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

