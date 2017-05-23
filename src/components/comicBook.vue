<template>
    <div>
        <article class="favourite-book">
            <span class="favourite-book-title">
                {{ comicBook.title }}
            </span>
            <figure>
                <img :src="comicBook.thumbnail | imageFullPath">
            </figure>
            <button
                type="button"
                class="btn btn-danger btn-xs comic-delete"
                @click="clearBookFromStorage(comicBook.id)"
            >
                <span>X</span>
            </button>
            <button
                type="button"
                class="btn btn-info btn-xs comic-watch"
                @click="sendModalData(comicBook)"
            >
                <span>more</span>
            </button>
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
        comicBook: {
            type: Object,
            required: true
        }
    },
    mounted() {
    },
    methods: {
        clearBookFromStorage(id) {
            let books = this.getFromStorage('myFavourites');
            if (books) {
                delete books[id];
                this.setStorage('myFavourites', books);
                this.$emit('updateBooks');
            }
        },
        sendModalData(data) {
            this.$emit('comicDetail', data);
        }
    }
}
</script>
<style>
</style>