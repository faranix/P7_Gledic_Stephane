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
  display: flex;
  justify-content: center;
  align-items: center;

  &__box {
    height: 95%;
    width: 95%;
    border-radius: 100px;
    background-color: #573280;
    border-top: solid 5px #23022E;
    border-bottom: solid 5px #23022E;
    box-shadow: 0px 0px 5px black;
  }
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;

  &__box {
    display: flex;
    flex-direction: column;
    color: #EFF8E2;
    margin: 20px;

    label {
      text-align: center;
      font-size: 30px;
      margin-bottom: 5px;
    }

    input {
      width: 800px;
      height: 50px;
      padding: 0 10px;
      background-color: #23022E;
      color: #EFF8E2;
      border: #EFF8E2 solid 1px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  // annimation du button
  button {
    position: relative;
    background-color: #23022E;
    padding: 20px 50px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 40px;
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
      background-color: #EFF8E2;
      transform: translateY(100%);
      transition: transform 0.3s ease-in-out;
    }

    &:hover::after  {
      transform: translateY(0%);
    }

    &:hover span {
      color: #23022E;
    }
  }
}

@media screen and (max-width: 900px) {
  .form {
    &__box {
      margin-top: 5px;
      label {
        font-size: 20px;
      }

      input {
        width: 600px;
        height: 40px;
        font-size: 14px;
      }
    }

    button {
      margin-top: 5px;
    }


  }
}

@media screen and (max-width: 645px) {
  .form {
    &__box {
      label {
        font-size: 15px;
        margin-bottom: 10px;
      }

      input {
        width: 350px;
      }
    }

    button {
      font-size: 20px;
    }
  }

}

@media screen and (max-width: 425px) {
  .singup {
    &__box {
      height: 100vh;
      width: 100vw;
      border-radius: 0px;
      box-shadow: none;
    }
  }
}

@media screen and (max-width: 365px) {
  .form {
    &__box {
      input {
        width: 280px;
      }
    }
  }
}
</style>
