<template>
  <div class="navhome">
      <div v-if="menuOpen == 1" class="navhome__open">
        <i @click="menuOpen = 0" class="fas fa-times"></i>
        <div class="navhome__open__profile">
            <p class="navhome__open__profile__pseudo">{{ pseudo }}</p>
        </div>
        <div class="navhome__open__paragraphe">
            <p class="navhome__open__paragraphe__text" @click="deleteAccountOpen = 1">Supprimer le compte</p>
            <div class="navhome__open__paragraphe__box" v-if="deleteAccountOpen == 1">
                <button class="navhome__open__paragraphe__box__btn" @click="deleteAccount()">Oui</button>
                <button class="navhome__open__paragraphe__box__btn" @click="deleteAccountOpen = 0">Non</button>
            </div>
            <p @click="disconnect()" class="navhome__open__paragraphe__text">Déconnexion</p>
        </div>
      </div>
      <div v-else @click="menuOpen = 1" class="navhome__close"><i class="fas fa-arrow-right"></i></div>
  </div>
</template>

<script>
export default {
    name: 'NavHome',
    data() {
        return {
            menuOpen: 1,
            deleteAccountOpen: 0,
        }
    },
    props: {
        pseudo: {
            type: String,
            required: true
        }
    },
    methods: {
        /**
         * Permet de ce deconnecter du compte
         */
        disconnect() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:8080/#/'
            console.log('disconnect');
        },

        /**
         * Permet de supprimer le compte
         */
        deleteAccount() {
            const userId = {
                userId: JSON.parse(localStorage.getItem('user')).id
            }

            console.log(userId);

            fetch('http://localhost:3000/api/deleteaccount', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userId)
            })
            .then(res => {
                res.json().then(data => {
                    this.disconnect();
                    console.log(data);
                })
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style lang='scss' scoped>
    .navhome__open {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        background-color: #573280;
        height: 700px;
        padding-bottom: 20px;

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
            border: solid 5px #23022E;

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
                color: #150E0E;
                transition: color 200ms ease-in-out;
            }
        }

        &__paragraphe {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1.4rem;
            font-weight: bold;
            color: #EFF8E2;
            margin-top: 5px;

            &__text {
                cursor: pointer;

                &:hover {
                    color: #23022E;
                    transition: all 200ms;
                }
            }


            &__box {
                display: flex;
                justify-content: center; 
                margin: 10px 0px;

                &__btn {
                    padding: 5px 10px;
                    cursor: pointer;
                    margin: 0 15px;
                    border: solid 2px #23022E;
                    border-radius: 2px;
                    font-weight: bold;

                    &:hover {
                        color: #f2f2f2;
                        background-color: #563280;
                        transition: all 200ms ease-in-out;
                    }

                }         
            }
        }

        &:hover {
            background-color: #563280ef;
            transition: all 200ms ease-out;
        }
    }

    .navhome__close {
        position: relative;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: 100%;
        background: #573280;
        border-radius: 50%;
        color: #150E0E;


        .fa-arrow-right {
            font-size: 1.4rem;
            position: absolute;
            right: 20%;
            top: 40%;
        }

        &:hover {
            margin-left: -45px;
            color: #f2f2f2;
            cursor: pointer;
            transition: all 300ms ease-in;
        }
    }
</style>