<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="searchTerm" placeholder="search character ...">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <h5>Characters</h5>
                <div class="col-md-6" v-for="comic in comics">
                    <comic-form
                        :comicCharacter="comic"
                    >                    
                    </comic-form>
                </div>
            </div>
            <div class="col-md-3">
                <h5>My Favorites</h5>
                <!-- <comic-form
                    :comicCharacter="comic"
                >                    
                </comic-form> -->
            </div>                
        </div>
        <div class="row">
            <div class="container-fluid">
                <vue-paginator
                    :pagination="pagination"
                    @updatePage="getMarvelComics(pagination.current_page - 1)"
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

var _ = require('lodash');

export default {
    mixins: [helper],
    components: {
        'vue-paginator': vuePaginator,
        'comic-form': comicForm
    },
    data() {
        return {
            searchTerm: '',
            comics: [],
            characterUrl: 'v1/public/characters',
            characterComicsUrl: '/v1/public/characters/{characterId}/comics',
            pagination: {
                total: 0,
                itemsPerPage: 10,
                current_page: 1             
            }            
        }
    },
    watch: {
        searchTerm: function() {
            this.$router.push({name: 'main'});
            this.getMarvelComics();
        }
    },
    mounted() {
        this.getMarvelComics();
    },
    methods: {
        getMarvelComics: _.debounce(function(page) {
            let apiUrl = this.api(this.characterUrl);
            let query = {
                params: {
                    apikey: this.apikey,
                    limit: this.pagination.itemsPerPage,
                }                    
            }
            if (this.searchTerm) {                
                query.params.nameStartsWith = this.searchTerm
            }
            if (page >= 0) {
                console.log("The current page is "+page);
                query.params.offset = page * this.pagination.itemsPerPage;
                
                this.$router.push({name: 'characters-all', params: { pageNumber: page + 1}});
            }
            this.$http.get(apiUrl, query)
            .then(({data}) => {
                this.pagination.total = data.data.total;
                this.comics = data.data.results;
                console.log(this.comics);
            }, (error) => {
            });
        }, 1000),
    }
}
</script>