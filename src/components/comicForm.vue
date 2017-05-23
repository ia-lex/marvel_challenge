<template>
    <div>
        <article class="comic-book">
            <span class="comic-title">
                {{ comics.title }}
            </span>
            <figure>
                <img :src="comics.thumbnail | imageFullPath">
            </figure>
            <div class="comic-buttons">
                <ul>
                    <li>
                        <button
                            type="button"
                            @click="addToMyList(comics)"
                            v-bind:class="[comics.isAdded ? 'button-favourite-added' : '', 'button-favourite']"
                        >
                            
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="btn btn-danger btn-block"
                            @click="sendModalData(comics)"
                        >
                            VIEW MORE
                        </button>
                    </li>
                </ul>
            </div>
        </article>
    </div>
</template>
<script>
import helper from '../js/helper';

var myFavourites = {};

export default {
    mixins: [helper],
    data() {
        return {
        }
    },
    props: {
        comics: {
            type: Object,
            required: true
        }
    },
    mounted() {
    },
    methods: {
        addToMyList(comic) {
            comic.isAdded = true;
            let singleComic = {};
            singleComic[comic.id] = comic;
            Object.assign(myFavourites, singleComic);
            this.setStorage('myFavourites', myFavourites);
        },
        sendModalData(data) {
            this.$emit('comicDetail', data);
        }
    }
}
</script>
<style>
</style>