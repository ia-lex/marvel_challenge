<template>
    <div class="container-fluid">
        <h2 class="text-center">COMICS</h2>
        <div class="row">
            <div class="col-md-6" v-for="comic in comics">
                <comic-form
                    :comics="comic"
                >   
                </comic-form>
            </div>
        </div>
        <div class="row">
            <div class="container-fluid">
                <vue-paginator
                    :pagination="pagination"
                    @updatePage="getComics(pagination.current_page)"
                >                    
                </vue-paginator>
            </div>
        </div>
    </div>
</template>
<script>
import helper from '../js/helper';
import vuePaginator from './paginator.vue';
import comicForm from './comicForm.vue';

export default {
    mixins: [helper],
    components: {
        'vue-paginator': vuePaginator,
        'comic-form': comicForm
    },
    data() {
        return {
            comics: [],
            characterComicsUrl: 'v1/public/characters/',
            pagination: {
                total: 0,
                itemsPerPage: 10,
                current_page: 1             
            } 
        }
    },
    mounted() {
        this.getComics();
    },
    methods: {
        getComics(page = 1) {
            let comicUrl = this.api(`${this.characterComicsUrl}${this.$route.params.id}/comics`);
            let query = {
                params: {
                    apikey: this.apikey,
                    limit: this.pagination.itemsPerPage,
                    offset: (page * this.pagination.itemsPerPage) - this.pagination.itemsPerPage
                }
            }
            this.$http.get(comicUrl, query)
            .then(({data}) => {
                this.pagination.total = data.data.total;
                this.comics = data.data.results;
                console.log(this.comics);
            }, (error) => {
                console.log(error);
            })
        }
    }
}
</script>
<style>
</style>