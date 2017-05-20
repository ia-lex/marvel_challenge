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
                            class="btn btn-danger btn-block"
                            @click="addToMyList(comics)"
                        >
                            ADD TO FAVOURITES
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="btn btn-danger btn-block"
                        >
                            VIEW MORE
                        </button>
                    </li>
                </ul>
            </div>
            <!-- <p>
                {{ comics.description ? comics.description : 'No description'}}
            </p> -->
            <!-- <div v-if="comicCharacter.comics.items.length" class="comic-list">
                <div>
                    <span>
                        <strong>
                            Related Comics
                        </strong>
                    </span>
                    <ul>
                        <li v-for="item in comicCharacter.comics.items">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
                <button
                    type="button"
                    class="btn btn-danger btn-xs pull-right"
                    @click="getComics(comicCharacter.id)"
                >
                    View Comics
                </button> 
            </div> -->
        </article>
    </div>
</template>
<script>
import helper from '../js/helper';

export default {
    mixins: [helper],
    data() {
        return {
            myFavourites: []
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
            let singleComic = {};
            singleComic[comic.id] = comic;
            // this.myFavourites = Object.assign({}, this.myFavourites, singleComic);
            this.myFavourites.push(singleComic);
            console.log(this.myFavourites);
        },
        sendevent() {
            this.$router.push({name: 'characters', params: { name: 'all', pageNumber: 20}});
        }
    }
}
</script>
<style>
</style>