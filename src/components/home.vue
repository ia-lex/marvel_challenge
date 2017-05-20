<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="searchTerm" placeholder="search character ...">
                    <button type="button" class="form-control" @click="getMarvelComics()">buscar</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <h5>Characters</h5>
                <div class="col-md-6" v-for="comic in comicsCharacters">
                    <character-form
                        :comicCharacter="comic"
                    >                    
                    </character-form>
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
                    @updatePage="getMarvelComics(pagination.current_page)"
                >                    
                </vue-paginator>
            </div>
        </div>
    </div>
</template>
<script>
import helper from '../js/helper';
import vuePaginator from './paginator.vue';
import characterForm from './characterForm.vue';

var _ = require('lodash');

export default {
    mixins: [helper],
    components: {
        'vue-paginator': vuePaginator,
        'character-form': characterForm
    },
    data() {
        return {
            searchTerm: '',
            comicsCharacters: [],
            characterUrl: 'v1/public/characters',
            defaultCharName: 'all',
            pagination: {
                total: 0,
                itemsPerPage: 10,
                current_page: 1             
            }           
        }
    },
    mounted() {
        this.checkStorage();
    },
    methods: {
        getMarvelComics(page = 1) {
            let apiUrl = this.api(this.characterUrl);
            let charName = this.defaultCharName;
            let query = {
                params: {
                    apikey: this.apikey,
                    limit: this.pagination.itemsPerPage,
                    offset: (page * this.pagination.itemsPerPage) - this.pagination.itemsPerPage
                }                    
            };
            
            if (this.searchTerm) {                
                query.params.nameStartsWith = this.searchTerm
                charName = this.searchTerm;
            }
            this.$router.push({name: 'characters', params: { name: charName, pageNumber: page}});

            this.$http.get(apiUrl, query)
            .then(({data}) => {
                this.pagination.total = data.data.total;
                this.comicsCharacters = data.data.results;
            }, (error) => {
                console.log(error);
            });
        },

        checkStorage() {
            let params = localStorage.getItem('backRouteParams');
            if (params) {
                let paramsRouteBack = JSON.parse(params);
                if (paramsRouteBack.name != this.defaultCharName) {
                    this.searchTerm = paramsRouteBack.name;
                }
                this.getMarvelComics(paramsRouteBack.pageNumber);
                return;
            }
            this.getMarvelComics();
        }
    }
}
</script>