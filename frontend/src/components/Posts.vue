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


            <div class="post__commentaire"></div>

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
import Overlay from '@/components/Overlay.vue'

export default {
    name: 'Post',
    components: {
        Overlay
    },
    data() {
        return {
            posts: [],
            userId: undefined,
            isAdmin: undefined,
            overlay: 0
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
    },
    methods: {
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
        height: 500px;
        margin-bottom: 50px;

        &__box {
            flex: 4;
            height: 100%;
            padding: 20px 20px;
            background-color: #383646;
            box-shadow:  inset -17px 0px 15px -11px rgba(0,0,0,0.62);
            color: #EFF8E2;

            .post__box__pseudo {
                display: flex;
                justify-content: space-between;
                font-weight: bold;

                i {
                    cursor: pointer;
                    margin-left: 10px;

                    &:hover {
                        color: red;
                    }
                }
            }

            .post__box__titre {
                margin: 20px 0;
            }
        }

        &__commentaire {
            flex: 2;
            height: 100%;
            background-color: #25242b;
        }

        img {
            width: 100%;
            height: 380px;
        }
    }
</style>