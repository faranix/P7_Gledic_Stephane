<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.id">
            <div v-if="commentaire.post_id == postId" class="commentaire">
                    <div class="commentaire__top">
                        <p class="commentaire__top__pseudo">{{ commentaire.pseudo }}</p>    
                        <div v-if="commentaire.user_id == userId" class="commentaire__top__icon">
                                <i @click="editCommentaire(commentaire.id)" class="far fa-edit"></i>
                                <i class="far fa-trash-alt"></i>
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

export default {
    name: 'Commentaire',
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user')).id
        }
    },
    props: {
        commentaires: {
            type: Array
        },
        postId: {
            type: Number,
        }
    },
    methods: {
        /**
         * Permet de modifier un commentaire
         */
        editCommentaire(id) {
            console.log(id);
        }
    },
}
</script>

<style lang='scss'>
    .commentaire {
            margin: 3px;
            padding: 8px 5px;
            background-color: #573280;
            border-radius: 2px;

        &__top {
            display: flex;
            justify-content: space-between;

            i {
                font-size: 0.8rem;
                margin: 0px 5px;
                cursor: pointer;

                &:hover {
                    color: #ADA8B6;
                    transition: color 200ms ease-in-out;
                }
            }
        }

        hr {
            margin: 5px 0;
        }

        &__content {
            font-size: 0.8rem;
        }
    }
</style>