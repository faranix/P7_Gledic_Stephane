<template>
  <div class="login">
    <div class="login__box">
      <NavLogin
       title="Connexion"
       :userId='userId'
        />

      <div class="error-message"></div>

      <form class="form" method="post">
        <div class="form__box">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="form__box">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" id="password" />
        </div>
        <button @click="loginUser()" type="button">
          <span>V</span>
        </button>
      </form>

      <Copyright />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavLogin from "@/components/NavLogin.vue";
import Copyright from "@/components/Copyright.vue";

// Importer des functions
//const service = require('../service/service.js')

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
        if (res.ok) {
          res.json().then(data => {
            console.log(data);
            // Stock les données de user dans le localstorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = `http://localhost:8080/#/home`
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

.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__box {
    height: 95vh;
    width: 95vw;
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
  height: 68%;

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

// Media Query
@media screen and (max-width: 900px) {
  .form {
    &__box {
      label {
        font-size: 20px;
        margin-bottom: 10px;
      }

      input {
        width: 600px;
      }
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
  .login {
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
