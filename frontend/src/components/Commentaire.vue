<template>
    <div>
        <div v-for="(commentaire, index) in commentaires" :key="commentaire.id">
            <div v-if="commentaire.post_id == postId" class="commentaire">
                    <div class="commentaire__top">
                        <p class="commentaire__top__pseudo">{{ commentaire.pseudo }}</p>    
                        <div class="commentaire__top__icon">
                                <i v-if="commentaire.user_id == userId" @click="openOverlay(commentaire.id, index)" class="far fa-edit commentaire-edit"></i>
                                <i v-if="commentaire.user_id == userId || isAdmin == 1 || postUserId == userId" @click="deleteCommentaire(commentaire.id, index)" class="far fa-trash-alt"></i>

                                <!-- Overlay -->
                                <div v-show="overlay == commentaire.id" class="commentaire-edit__overlay">
                                    <div class="commentaire-edit__overlay__box">
                                        <i @click="overlay = - 1" class="commentaire-edit__overlay__box__close fas fa-times"></i>
                                        <div class="commentaire-edit__overlay__box__input">
                                            <form @submit.prevent method="post">
                                                <input @keypress.enter="editCommentaire(commentaire.id, index) " name="commentaire-edit" :id="'commentaire-edit' + commentaire.id" type="text">
                                                <button @click="editCommentaire(commentaire.id, index)" type="button" id="commentaire-edit-Btn">V</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <p class="commentaire__content">{{ commentaire.content }}</p>
                    </div>
            </div>

        </div>
    </div>
</template>

<script>
// Service
import CommentaireService from '@/service/CommentaireService.js';

export default {
    name: 'Commentaire',
    data() {
        return {
            commentaireService: new CommentaireService,
            userId: JSON.parse(localStorage.getItem('user')).id,
            commentaires: [],
            overlay: undefined,
            isAdmin: JSON.parse(localStorage.getItem('user', [1])).isAdmin
        }
    },
    props: {
        postId: {
            type: Number,
        },
        postUserId: {
            type: Number
        }
    },
    mounted() {
        this.getCommentaires();
    },
    methods: {
        /**
         * Permet de modifier un commentaire
         */
        editCommentaire(id, index) {

            this.commentaireService.editCommentaire(id)
                .then(data => {
                    const editPost = {
                        content: data[0].content,
                        id: data[0].id,
                        post_id: data[0].post_id,
                        pseudo: data[0].pseudo,
                        user_id: data[0].user_id
                    }

                    this.commentaires.splice(index, 1, editPost);
                })
            this.overlay = 0;
        },

        /**
         * Permet de supprimer un commentaire
         */
        deleteCommentaire(id, index) {
            this.commentaireService.deleteCommentaire(id);
            this.commentaires.splice(index, 1)
        },

        /**
         * Permet de récuperer tout les commentaires
         */
        getCommentaires() {
            this.commentaireService.getCommentaire().then(data => {
                this.commentaires = data;
            })
        },

        /**
         * Permet d'ouvir l'overlay du commentaire a édité
         */
        openOverlay(id, index) {
            this.overlay = id;
            document.querySelector('#commentaire-edit' + id).value = this.commentaires[index].content;
        }
    },
}
</script>
