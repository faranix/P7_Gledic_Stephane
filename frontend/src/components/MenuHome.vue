<template>
  <div v-if="menuOpen == 1"  class="navhome">
    <i @click="menuOpen = 0" class="fas fa-times"></i>
    <div class="navhome__profile">
        <p class="navhome__profile__pseudo">{{ pseudo }}</p>
    </div>
    <p @click="disconnect()" class="navhome__deconnexion">Déconnexion</p>
  </div>
</template>

<script>
export default {
    name: 'NavHome',
    data() {
        return {
            menuOpen: 1,
        }
    },
    props: {
        pseudo: {
            type: String,
            required: true
        }
    },
    methods: {
        disconnect() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:8080/#/'
            console.log('disconnect');
        },
    }
}
</script>

<style lang='scss' scoped>
    .navhome {
        position: relative;
        background-color: #23022e;
        height: 700px;

        &__profile {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 80px;
            left: 20%;
            background-color: #573280;
            width: 150px;
            height: 150px;
            border-radius: 100%;

            &__pseudo {
                font-size: 20px;
                color: #EFF8E2;
            }
        }

        i {
            position: absolute;
            right: 10%;
            top: 5%;
            font-size: 30px;
            color: #EFF8E2;
            cursor: pointer;

            &:hover {
                color: #23022E;
            }
        }

        &__deconnexion {
            position: absolute;
            bottom: 30px;
            left: 20%;
            font-size: 25px;
            font-weight: bold;
            color: #EFF8E2;
            cursor: pointer;

            &:hover {
                color: #23022E;
                transition: all 200ms;
            }
        }

        &:hover {
            background-color: #23022e6e;
            transition: all 600ms;
        }
    }
</style>