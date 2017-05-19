<template>
    <div>
        <article class="comic-character">
            <figure>
                <img :src="comicCharacter | imageFullPath">
            </figure>
            <span class="char-name">
                {{ comicCharacter.name }}
            </span>
            <p>
                {{ comicCharacter.description ? comicCharacter.description : 'No description'}}
            </p>
            <div v-if="comicCharacter.comics.items.length" class="comic-list">
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
            </div>
        </article>
    </div>
</template>
<script>
export default {
    props: {
        comicCharacter: {
            type: Object,
            required: true
        }
    },
    methods: {
        getComics(id) {
            console.log(id);
        }
    }
}
</script>
<style>
    /*article.comic-character {
        width: 85%;
        border-width: 2px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.9);
        border-radius: 0px 0px 15px 15px;
        vertical-align: top;
        margin: 50px 0px 20px 10%;
        background-color: blue;
        display: inline-block;
        position: relative;
        font-size: 1.2em;
    }*/
</style>