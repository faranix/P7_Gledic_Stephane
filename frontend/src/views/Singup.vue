<template>
  <div class="singup">
    <div class="singup__box">
      <NavLogin title="Inscription" />

      <div class="error-message"></div>

      <form class="form" method="post" action="">
        <div class="form__box">
          <label for="pseudo">Pseudo</label>
          <input type="text" name="pseudo" id="pseudo" />
        </div>
        <div class="form__box">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="form__box">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" id="password" />
        </div>
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

// Importer des functions
const service = require('../service/service.js');

export default {
  name: "Singup",
  components: {
    NavLogin, Copyright
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
            service.showError(data);
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

<style lang="scss" scoped>
  .singup {
    height: 100vh;
    padding: 0 40px;

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 5% 20% 0 20%;
      padding: 80px;
      color: #150E0E;
      border: solid 5px #150e0e;

      &__box {
        display: flex;
        flex-direction: column;
        
        label {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        input {
          width: 500px;
          height: 40px;
          padding: 10px;
          margin-bottom: 30px;
          font-size: 1.2rem;
          border: #150E0E solid 5px;

          &:focus {
            outline: none;
            border: solid 5px #573280;
          }
        }
      }

      &:hover {
        box-shadow: -10px 10px #573280;
        transition: box-shadow 450ms ease-in-out;
      }
      
    }

        // annimation du button
    button {
      position: relative;
      background-color: #150E0E;
      padding: 20px 50px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: bold italic;
      overflow: hidden;

        & span {
        position: relative;
        z-index: 2;
        color: #EFF8E2;
        transition: color 0.3s ease-in-out;
      }
      
      &::after {
        content: "";
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #573280;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
      }

      &:hover::after  {
        transform: translateY(0%);
      }
    }
  }
</style>
