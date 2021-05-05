<template>
    <div class="posts">
        <div :id="post.id" :key="post.id" v-for="post in posts" class="post">
            <div class="post__box">
                <div class="post__box__pseudo">
                    <p class="pseudo">{{ post.pseudo }}</p>
                    <div v-if="userId === post.user_id || isAdmin === 1" class="post__box__pseudo__icon-menu">
                        <i @click="overlay = post.id" class="far fa-edit"></i>
                        <i @click="deletePost(post.id)" class="far fa-trash-alt"></i>
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
                        :commentaires="commentaires"
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
                nameBtn='Modifer'
                :overlay='overlay'
                :closeOverlay='closeOverlay'
            />
        </div>
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import Commentaire from '@/components/Commentaire.vue';

export default {
    name: 'Posts',
    components: {
        Overlay, Commentaire
    },
    data() {
        return {
            posts: [],
            userId: undefined,
            isAdmin: undefined,
            overlay: 0,
            commentaires: [],
        }
    },
    mounted() {
        // Récuperation les posts
        fetch('http://localhost:3000/api/connect/getpost', {
            method: 'get',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            res.json().then(data => {
                // Stocker tout les posts dans un array mettre les plus récent en premier
                this.posts = data;
                this.posts.reverse()

                this.isAdmin = JSON.parse(localStorage.getItem('user', [1])).isAdmin;
                this.userId = JSON.parse(localStorage.getItem('user', [1])).id;
                console.log(this.posts);
            })
        })
        .catch(error => console.log(error));

        // En cours de creation 
        
        /**
         * Permet de récuperer tout les commentaires
         */
        fetch('http://localhost:3000/api/commentaire/get', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => {
            res.json().then(data => {
                this.commentaires = data;

                console.log(this.commentaires);
            })
        })
        .catch(error => console.log(error));
    },
    methods: {
        
        /**
         * Permet de poster un commentaire
         */
        postCommentaire(id) {
            // recuperation du bon input 
            let content = document.querySelector(`#commentaire${id}`).value;
            // recuperation des données
            const postId = id
            const userId = JSON.parse(localStorage.getItem('user')).id;

            // Les données que on va envoyer au backend
            const sendData = {
                content: content,
                userId: userId,
                postId: postId
            };

            console.log(sendData);
            if (sendData.content == '') {
                console.log('Remplissez le champ');
            } else {
                fetch('http://localhost:3000/api/commentaire/post', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(sendData)
                })
                .then(res => {
                    res.json().then(data => {
                        console.log(data);
                        document.querySelector(`#commentaire${id}`).value = ''
                    })
                }) 
                .catch(error => console.log(error));
            }
        },

        /**
         * Permet de modifier un post
         */
        editPost(postId) {
            const form = document.querySelector('#formPublier');
            let postData = [];

            form.forEach(element => {
                // Verifie que les champs son remplie
                if (element.value == '') {
                    element = false;
                }
                postData.push(element.value)
            });
            
            const sendData = {
                postId: postId,
                title: postData[0],
                url: postData[1]
            }

            console.log(sendData);

            if (postData[1] == undefined || postData[2] == undefined) {
                console.log('Veuillez remplir tout les champs !');
            } else {
                fetch('http://localhost:3000/api/connect/editpost', {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(sendData)
                })
                .then(res => {
                    res.json().then(data => {
                        console.log(data);
                        this.overlay = 0;
                        window.location.reload();
                    })
                })
                .catch(error => console.log(error));
            }
        },

        /**
         * Permet de supprimer un post
         */
        deletePost(id) {
            const postId = {
                id: id
            }

            console.log(postId);
            fetch('http://localhost:3000/api/connect/deletepost', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(postId)
            })
            .then(res => {
                res.json().then(data => {
                    console.log(data);
                    window.location.reload();
                })
            })
            .catch(error => console.log(error));
        },

        closeOverlay() {
            this.overlay = 0
        }
    }
}
</script>

<style lang='scss'>
    .post {
        display: flex;
        width: 100%;
        height: 600px;
        margin-bottom: 50px;
        box-shadow: 10px 10px 20px #23022E;

        &__box {
            flex: 4;
            height: 100%;
            padding: 20px 20px;
            border: solid 5px #150E0E;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border-right: none;
            overflow: hidden;
            overflow-wrap: break-word;



            .post__box__pseudo {
                display: flex;
                justify-content: space-between;
                font-weight: bold;
                font-size: 1.3rem;

                i {
                    cursor: pointer;
                    margin-left: 10px;
                    font-size: 1.3rem;

                    &:hover {
                        color: #573280;
                        transition: color 200ms ease-in-out;
                    }
                }
            }

            .post__box__titre {
                margin: 20px 0;
                font-size: 1rem;
            }
        }

        &__commentaire {
            display: flex;
            flex-direction: column;
            flex: 2;
            position: relative;
            padding: 5px;
            color: #f2f2f2;
            background-color: #23022E;
            height: 100%;
            box-shadow:  inset -17px 0px 15px -11px rgba(0,0,0,0.62);
            overflow: hidden;

            &__content {
                height: 90%;
                border-radius: 2px;
                overflow-y: scroll;
            }

            .commentaire__input {
                position: absolute;
                bottom: 1%;
                width: 100%;
                margin-left: 8px;
                margin-bottom: 5px;

                input {
                    width: 80%;
                    padding: 12px 5px;
                    border: none;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    padding: 12px 10px;
                    color: #f2f2f2;
                    background-color: #573280;
                    border: none;
                    cursor: pointer;

                    &:hover {
                        background: #6e469c; 
                        transition: all 200ms ease-in;  
                    }
                }

                &:focus {
                    border: solid 4px #fff;
                }
            }


        }

        img {
            width: 100%;
            height: 400px;
            border-radius: 5px;
            box-shadow: 0px 0px 2px #150E0E;
        }
    }

</style>