<template>
    <div>
        <article class="comic-character">
            <figure>
                <img :src="comicCharacter.thumbnail | imageFullPath" class="img-circle">
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
            this.$router.push({name: 'comics', params: { id: id}});
        }
    }
}
</script>
<style>
</style>