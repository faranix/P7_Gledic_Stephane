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
        background-color: rgba(20, 19, 19, 0.7);
        z-index: 10;

        &__box {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 80%;
            height: 80%;
            background-color: #f8f7f7;
            border-radius: 3px;

            .closeOverlay {
                position: absolute;
                top: 3%;
                right: 3%;
                font-size: 2.2rem;
                cursor: pointer;

                &:hover {
                    color: #573280;
                    transition: color 200ms ease-in-out;
                }
            }

            #formPublier {
                display: flex;
                flex-direction: column;
                text-align: center;
                width: 60%;

                label {
                    font-size: 1.7rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                }

                input {
                    margin-bottom: 50px;
                    padding: 10px;
                    height: 50px;
                    border: solid 5px #150E0E;
                    border-radius: 3px;
                    font-size: 1.2rem;

                    &:focus {
                        border: solid 5px #573280;
                    }
                }

                button {
                    position: relative;
                    padding: 10px;
                    border-radius: 3px;
                    font-size: 1.7rem;
                    background-color: #150E0E;
                    border: solid 5px #150E0E;
                    overflow: hidden;

                    & span {
                        position: relative;
                        z-index: 2;
                        color: #EFF8E2;
                        transition: color 0.3s ease-in-out;
                    }
                    
                    &::after {
                        content: "";
                        position: absolute;
                        top: 0px;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: #573280;
                        transform: translateY(100%);
                        transition: transform 0.3s ease-in-out;
                    }

                    &:hover::after  {
                        transform: translateY(0%);
                    }
                }

            }
        }

        button {
            cursor: pointer;
        }
    }
</style>