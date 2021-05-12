<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.id">
            <div v-if="commentaire.post_id == postId" class="commentaire">
                    <div class="commentaire__top">
                        <p class="commentaire__top__pseudo">{{ commentaire.pseudo }}</p>    
                        <div v-if="commentaire.user_id == userId" class="commentaire__top__icon">
                                <i @click="overlay = commentaire.id" class="far fa-edit commentaire-edit"></i>
                                <i @click="deleteCommentaire(commentaire.id)" class="far fa-trash-alt"></i>

                                <!-- Overlay -->
                                <div v-if="overlay == commentaire.id" class="commentaire-edit__overlay">
                                    <div class="commentaire-edit__overlay__box">
                                        <i @click="overlay = -1" class="commentaire-edit__overlay__box__close fas fa-times"></i>
                                        <div class="commentaire-edit__overlay__box__input">
                                            <form method="post">
                                                <input placeholder="Votre Commentaire" name="commentaire-edit" :id="'commentaire-edit'+ commentaire.id"  type="text">
                                                <button @click="editCommentaire(commentaire.id)" type="button" id="commentaire-edit-Btn">V</button>
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
import FetchCommentaire from '@/service/FetchCommentaire.js';

export default {
    name: 'Commentaire',
    data() {
        return {
            fetchcommentaire: new FetchCommentaire,
            userId: JSON.parse(localStorage.getItem('user')).id,
            commentaires: [],
            overlay: undefined,
        }
    },
    props: {
        postId: {
            type: Number,
        }
    },
    mounted() {
        this.getCommentaires();
    },
    methods: {
        /**
         * Permet de modifier un commentaire
         */
        editCommentaire(id) {
            this.fetchcommentaire.editCommentaire(id);
            this.getCommentaires();
            this.overlay = 0;
        },

        /**
         * Permet de supprimer un commentaire
         */
        deleteCommentaire(id) {
            this.fetchcommentaire.deleteCommentaire(id);
            this.getCommentaires();
        },

        /**
         * Permet de récuperer tout les commentaires
         */
        getCommentaires() {
            fetch('http://localhost:3000/api/commentaire/get', {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                res.json().then(data => {
                    this.commentaires = data;
                })
            })
            .catch(error => console.log(error));
        }
    },
}
</script>
