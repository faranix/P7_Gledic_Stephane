<template>
    <div class="posts">
        <div :id="post.id" :key="post.id" v-for="(post, index) in posts" class="post">
            <div class="post__box">
                <div class="post__box__pseudo">
                    <p class="pseudo">{{ post.pseudo }}</p>
                    <div class="post__box__pseudo__icon-menu">
                        <i v-if="userId === post.user_id" @click="openOverlay(post.id)" class="far fa-edit"></i>
                        <i v-if="userId === post.user_id || isAdmin === 1" @click="deletePost(post.id, index)" class="far fa-trash-alt"></i>
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
                        <input @keypress.enter="postCommentaire(post.id)"  placeholder="Votre Commentaire" name="commentaire" :id="'commentaire'+ post.id"  type="text">
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
        editPost(postId, index) {
            let url = document.querySelector('#url').value;
            const regex = '(?:jpg|gif|png)'

            if (url.match(regex) == null) {
                console.log('Url invalide');
            } else {
                this.postService.editPost(postId).then(data => {
                    const newPost = {
                        id: data[0].id,
                        pseudo: 'Guillaume',
                        title: data[0].title,
                        url: data[0].url,
                    };
    
                    this.posts.splice(index, 1, newPost);
                    console.log(this.posts);
                })
                this.overlay = 0;
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
            this.overlay = 0
        },

        /**
         * Permet d'afficher tout les posts
         */
        getPosts() {
            this.postService.getPosts().then(data => {
                // Stocker tout les posts dans un array mettre les plus récent en premier
                this.posts = data;
                this.posts.reverse();

                this.isAdmin = JSON.parse(localStorage.getItem('user', [1])).isAdmin;
                this.userId = JSON.parse(localStorage.getItem('user', [1])).id;
            })
        }
    },
}
</script>
