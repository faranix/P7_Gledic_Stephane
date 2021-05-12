<template>
    <div :v-model="posts" class="posts">
        <div :id="post.id" :key="post.id" v-for="post in posts" class="post">
            <div class="post__box">
                <div class="post__box__pseudo">
                    <p class="pseudo">{{ post.pseudo }}</p>
                    <div class="post__box__pseudo__icon-menu">
                        <i v-if="userId === post.user_id" @click="openOverlay(post.id)" class="far fa-edit"></i>
                        <i v-if="userId === post.user_id || isAdmin === 1" @click="deletePost(post.id)" class="far fa-trash-alt"></i>
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
                    <form method="post">
                        <input placeholder="Votre Commentaire" name="commentaire" :id="'commentaire'+ post.id"  type="text">
                        <button @click="postCommentaire(post.id)" type="button" id="commentaireBtn">V</button>
                    </form>
                </div>
            </div>

            <!-- Overlay -->
            <Overlay 
                :formSend="editPost"
                :postId='post.id'
                :title='post.title'
                :url='post.url'
                nameBtn='Modifer'
                :overlay='overlay'
                :closeOverlay='closeOverlay'
            />
        </div>
    </div>
</template>

<script>

// Components
import Overlay from '@/components/Overlay.vue';
import Commentaire from '@/components/Commentaire.vue';

// Service
import FetchPost from '@/service/FetchPost.js';
import FetchCommentaire from '@/service/FetchCommentaire.js';

export default {
    name: 'Posts',
    components: {
        Overlay, Commentaire
    },
    data() {
        return {
            fetchPost: new FetchPost,
            fetchCommentaire: new FetchCommentaire,
            posts: [],
            userId: undefined,
            isAdmin: undefined,
            overlay: 0,

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
            this.fetchCommentaire.postCommentaire(id);

            const post = [];
            // Stock tout les enfants qui sont des divs !
            this.$children.forEach(element => {
                if (element.postId == id) {
                    post.push(element);
                }
            });

            post[0].getCommentaires();
        },

        /**
         * Permet de modifier un post
         */
        editPost(postId) {
            this.fetchPost.editPost(postId);
            this.getPosts();
            this.overlay = 0;
        },

        /**
         * Permet de supprimer un post
         */
        deletePost(id) {
            this.fetchPost.deletePost(id);
            this.getPosts();
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
            this.overlay = 0
        },

        /**
         * Permet d'afficher tout les posts
         */
        async getPosts() {
            await fetch('http://localhost:3000/api/connect/getpost', {
                method: 'get',
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                res.json().then(data => {
                    // Stocker tout les posts dans un array mettre les plus récent en premier
                    this.posts = data;
                    this.posts.reverse();

                    this.isAdmin = JSON.parse(localStorage.getItem('user', [1])).isAdmin;
                    this.userId = JSON.parse(localStorage.getItem('user', [1])).id;
                })
            })
            .catch(error => console.log(error));
        }
    },
}
</script>
