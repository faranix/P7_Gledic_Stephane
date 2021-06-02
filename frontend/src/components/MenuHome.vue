<template>
  <div class="navhome">
      <div v-if="menuOpen == 1" class="navhome__open">
        <i @click="menuOpen = 0" class="fas fa-times navhome__open__icon"></i>
        <div class="navhome__open__profile">
            <p class="navhome__open__profile__pseudo">{{ pseudo }}</p>
            <img class="navhome__open__profile__img" :src="photo_de_profil" alt="photo de profil">
            <input type="file" id="changefile" accept="image/*">
        </div>
        <div class="navhome__open__paragraphe">
            <p class="navhome__open__paragraphe__text" @click="changePhoto = 1">Changer de photo de profil</p>
            <form class="navhome__open__paragraphe__form" v-if="changePhoto == 1" method="post" enctype="multipart/form-data">
                <input class="navhome__open__paragraphe__form__input" type="file" accept="image/*" required>
                <div>
                    <button @click="uploadPhoto()" type="button">Changer</button>
                    <button @click="changePhoto = 0" type="button">Annuler</button>
                </div>
            </form>
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
// Service
import AccountService from '@/service/AccountService.js';

export default {
    name: 'NavHome',
    data() {
        return {
            menuOpen: 0,
            deleteAccountOpen: 0,
            changePhoto: 0,
            accountService: new AccountService,
            photo_de_profil: undefined
        }
    },
    props: {
        pseudo: {
            type: String,
            required: true
        }
    },
    mounted() {
         if (this.photo_de_profil == undefined) {
            this.photo_de_profil = require('../assets/images/groupamania.jpg')
         } 
    },
    methods: {
        /**
         * Permet de ce deconnecter du compte
         */
        disconnect() {
            this.accountService.disconnect();
        },

        /**
         * Permet de supprimer le compte
         */
        deleteAccount() {
            this.accountService.deleteAccount();
        },

        uploadPhoto() {
            let input = document.querySelector('.navhome__open__paragraphe__form__input');

            // Crée un blob qui va changer la photo de profil
            if (input.value == '' || undefined || null) {
                this.photo_de_profil = require('../assets/images/groupamania.jpg')
            } else {
                let url = URL.createObjectURL(input.files[0]);
                console.log(url);
                this.photo_de_profil = url;

                // En cours
                const data = {
                    file: input.files[0],
                    userId: JSON.parse(localStorage.getItem('user')).id
                };

                fetch('http://localhost:3000/api/changeimage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
            }

            this.changePhoto = 0;
        },
    }
}
</script>
