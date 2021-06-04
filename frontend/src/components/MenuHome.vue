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
                    <button class="navhome__open__paragraphe__form__btn" @click="uploadPhoto()" type="button">Changer</button>
                    <button class="navhome__open__paragraphe__form__btn" @click="deletePhoto()" type="button">Supprimer</button>
                    <button class="navhome__open__paragraphe__form__btn" @click="changePhoto = 0" type="button">Annuler</button>
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
            photo_de_profil: require('../assets/images/groupamania.jpg')
        }
    },
    props: {
        pseudo: {
            type: String,
            required: true
        }
    },
    mounted() {
        /**
         * Permet d'obtenir image de l'utilisateur
         */
        fetch('http://localhost:3000/api/getimage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            res.json().then(data => {
                if (data[0].picture == null) {
                    this.photo_de_profil = require('../assets/images/groupamania.jpg')
                } else {
                    this.photo_de_profil = `http://localhost:3000/${data[0].picture}`;
                }
            })
        })
        .catch(() => console.log('Une erreur !'));
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

        /**
         * Permet de changer de photo de profile 
         */
        uploadPhoto() {
            let input = document.querySelector('.navhome__open__paragraphe__form__input');

            // Vérifie si il y a une photo ou non 
            if (input.value == '' || undefined || null) {
                // Si il y a pas de photo mettre cette image par defaut 
                this.photo_de_profil = require('../assets/images/groupamania.jpg')
            } else {
                // Crée un FormData pour envoyer un fichier
                const formData = new FormData()
                formData.append('image', input.files[0]);

                // Envoie des data aux backend 
                fetch('http://localhost:3000/api/changeimage', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData
                })
                .then(res => {
                    res.json().then(data => {
                        // Remplace la photo par la photo de la data base 
                        this.photo_de_profil = `http://localhost:3000/${data[0].picture}`;
                    })
                })
                .catch(() => console.log("Une erreur viens d'arriver"));
            }

            this.changePhoto = 0;
        },

        /**
         * Permet de Supprimer l'image de l'utilisateur !
         */
        deletePhoto() {
            const data = {
                userId: JSON.parse(localStorage.getItem('user')).id
            }

            fetch('http://localhost:3000/api/deleteimage', {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                res.json().then(() => {
                    this.photo_de_profil = require('../assets/images/groupamania.jpg');
                })
            })
            .catch(() => console.log('Erreur'));
        }
    }
}
</script>
