<template>
    <div class="posts">
        <p>{{ errorPost }}</p>
        <div :id="post.id" :key="post.id" v-for="(post, index) in posts" class="post">
            <div class="post__box">
                <div class="post__box__pseudo">
                    <p class="pseudo">{{ post.pseudo }}</p>
                    <div class="post__box__pseudo__icon-menu">
                        <i v-if="post.user_id === userId" @click="openOverlay(post.id)" class="far fa-edit"></i>
                        <i v-if="post.user_id === userId || isAdmin === 1" @click="deletePost(post.id, index)" class="far fa-trash-alt"></i>
                    </div>
                </div>
                <p class="post__box__titre">{{ post.title }}</p>
                <div class="post__box__img">
                    <img :src="post.url" alt="Image du post">
                </div>  
            </div>


            <div class="post__commentaire">
                <div class="post__commentaire__content">
                    <Commentaire 
                        :postId="post.id"
                        :postUserId="post.user_id"
                    />
                </div>
                <div class="commentaire__input">
                    <form @submit.prevent method="post">
                        <input @keypress.enter="postCommentaire(post.id)" placeholder="Votre Commentaire" name="commentaire" :id="'commentaire'+ post.id"  type="text">
                        <button @click="postCommentaire(post.id)" type="button" id="commentaireBtn">V</button>
                    </form>
                </div>
            </div>

            <!-- Overlay -->
            <Overlay 
                :formSend="editPost"
                :postId='post.id'
                :index="index"
                :title='post.title'
                :url='post.url'
                nameBtn='Modifer'
                :overlay='overlay'
                :closeOverlay='closeOverlay'
                :errorMessage='errorMessage'
            />
        </div>
    </div>
</template>

<script>

// Components
import Overlay from '@/components/Overlay.vue';
import Commentaire from '@/components/Commentaire.vue';

// Service
import PostService from '@/service/PostService.js';
import CommentaireService from '@/service/CommentaireService.js';

export default {
    name: 'Posts',
    components: {
        Overlay, Commentaire
    },
    data() {
        return {
            postService: new PostService,
            commentaireService: new CommentaireService,
            posts: [],
            userId: undefined,
            isAdmin: undefined,
            overlay: 0,
            errorMessage: undefined,
            errorPost: undefined,

        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {    
        /**
         * Permet de poster un commentaire
         */
        postCommentaire(id) {
            this.commentaireService.postCommentaire(id).then(data => {
                document.querySelector(`#commentaire${id}`).value = '';
                this.$children.forEach(element => {
                    element.commentaires = data;
                });              
            });
        },

        /**
         * Permet de modifier un post
         */
        editPost(postId) {
            let titre = document.querySelector('#titre').value;
            let url = document.querySelector('#url').value;
            // Pour avoir une url avec une extention a la fin.
            const regex = '(?:jpg|gif|png|jpeg)'

            if (titre.length > 255) {
                this.errorMessage = 'Trop de caractére !'
            } else {
                if (url.match(regex) == null) {
                    this.errorMessage = 'Url invalide !';
                } else {
                    this.postService.editPost(postId).then(() => {
                        this.getPosts();
                        this.overlay = 0;
                    })
                }
            }


            
        },

        /**
         * Permet de supprimer un post
         */
        deletePost(id, index) {
            this.postService.deletePost(id);
            this.posts.splice(index, 1);
        },

        /**
         * Permet d'ouvir l'overlay
         */
        openOverlay(postId) {
            this.overlay = postId;
        },

        /**
         * Permet de fermer l'overlay
         */
        closeOverlay() {
            this.overlay = 0;
        },

        /**
         * Permet d'afficher tout les posts
         */
        getPosts() {
            this.postService.getPosts()
                .then(data => {
                    // Stocker tout les posts dans un array mettre les plus récent en premier
                    this.posts = data;
                    this.posts.reverse();

                    this.isAdmin = JSON.parse(localStorage.getItem('user', [1])).isAdmin;
                    this.userId = JSON.parse(localStorage.getItem('user', [1])).id;
                })
                .catch(() => {
                    this.errorPost = 'Une erreur est survenue !';
                }); 
        }
    },
}
</script>
