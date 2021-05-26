<template>
  <div class="navhome">
      <div v-if="menuOpen == 1" class="navhome__open">
        <i @click="menuOpen = 0" class="fas fa-times navhome__open__icon"></i>
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
// Service
import AccountService from '@/service/AccountService.js';

export default {
    name: 'NavHome',
    data() {
        return {
            menuOpen: 0,
            deleteAccountOpen: 0,
            accountService: new AccountService
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
            this.accountService.disconnect();
        },

        /**
         * Permet de supprimer le compte
         */
        deleteAccount() {
            this.accountService.deleteAccount();
        }
    }
}
</script>
