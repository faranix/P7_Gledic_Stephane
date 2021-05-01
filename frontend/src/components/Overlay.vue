<template>
    <!-- Overlay pour crée un nouveau post -->
    <div v-if="overlay == postId" class="overlay">
        <div class="overlay__box">
            <i @click="closeOverlay()" class="closeOverlay fas fa-times"></i>
            <form id="formPublier" action="" method="">
                <label for="titre">Titre</label>
                <input type="text" name="titre" id="titre" required>
                <label for="url">url</label>
                <input type="url" pattern="https://.*" name="url" id="url" required>
                <button @click="formSend(postId)" type="button" value="Publier">{{ nameBtn }}</button>
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
    }
}
</script>

<style lang='scss'>
    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(20, 19, 19, 0.63);

        &__box {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 80%;
            height: 80%;
            background-color: #f8f7f7;

            .closeOverlay {
                position: absolute;
                top: 3%;
                right: 3%;
                font-size: 25px;
                cursor: pointer;
            }

            #formPublier {
                display: flex;
                flex-direction: column;
                text-align: center;
                width: 40%;
            }
        }

        button {
            cursor: pointer;
        }
    }
</style>