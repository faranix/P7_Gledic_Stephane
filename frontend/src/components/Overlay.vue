<template>
    <!-- Overlay pour crée un nouveau post -->
    <div v-if="overlay == postId" class="overlay">
        <div class="overlay__box">
            <i @click="closeOverlay()" class="closeOverlay fas fa-times"></i>
            <form id="formPublier" action="" method="post">
                <label for="titre">Titre</label>
                <input type="text" name="titre" id="titre" required>
                <label for="url">url</label>
                <input type="url" pattern="https://.*" name="url" id="url" required>
                <button @click="formSend(postId)" type="button" value="Publier"><span>{{ nameBtn }}</span></button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Overlay',
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
        }
    },
    updated() {
        // Permet d'afficher anciens text
        if (this.overlay == this.postId) {
            document.querySelector('#titre').value = this.title;
            document.querySelector('#url').value = this.url;

            // Si jamais veut crée un post cela affichera cela
            if (this.postId == 1) {
                document.querySelector('#titre').value = 'Veuillez renseignez le champs !';
                document.querySelector('#url').value = 'Veuillez renseignez le champs !';
            }
        }
    }
}
</script>