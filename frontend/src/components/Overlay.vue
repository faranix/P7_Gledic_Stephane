<template>
    <!-- Overlay pour crée un nouveau post -->
    <div v-if="overlay == postId" class="overlay">
        <div class="overlay__box">
            <i @click="closeOverlay()" class="closeOverlay fas fa-times"></i>
            <form id="formPublier" action="" method="post">
                <label for="titre">Titre</label>
                <input type="text" name="titre" id="titre" v-model="titre" placeholder="Entrée un titre" required>
                <label for="url">url</label>
                <input type="url" name="url" id="url" v-model="image" placeholder="Entrée une url" required>
                <p class="error-message">{{ errorMessage }}</p>
                <button @click="formSend(postId, index)" type="button" value="Publier"><span>{{ nameBtn }}</span></button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Overlay',
    data() {
        return {
            image: this.url,
            titre: this.title,
        }
    },
    props: {
        formSend: {
            type: Function,
            paramter: true,
            required: true
        },
        nameBtn: {
            type: String,
            required: true
        },
        overlay: {
            type: Number,
        },
        postId: {
            type: Number
        },
        closeOverlay: {
            type: Function,
            required: true
        },
        title: {
            type: String,
        },
        url: {
            type: String,
        },
        index: {
            type: Number,
        }, 
        errorMessage: {
            type: String,
        }
    },
}
</script>