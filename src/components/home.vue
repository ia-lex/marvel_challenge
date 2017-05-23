<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="input-group search-bar">
                    <input type="text" class="form-control" v-model="searchTerm" placeholder="search character ...">
                    <span class="input-group-btn">
                        <button type="button" class="form-control" @click="getMarvelComics()">Search</button>
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <div class="field-title-char">
                    <figure>
                        <img src="../assets/characters.png">         
                    </figure>
                    <h4>Characters</h4> 
                </div>
                <div class="col-md-6" v-for="comic in comicsCharacters">
                    <character-form
                        :comicCharacter="comic"
                    >                    
                    </character-form>
                </div>
            </div>
            <div class="col-md-3 favourite-books-field">
                <div class="field-title-fav">
                    <figure>
                        <img src="../assets/favourites.png">         
                    </figure>
                    <h4>My favourites</h4> 
                </div>
                <div class="books-scroll">
                    <div v-for="book in books">
                        <comic-book
                            :comicBook="book"
                            @updateBooks="checkBooks()"
                            @comicDetail="openDetailModal(book)"
                        >                    
                        </comic-book>
                    </div>
                </div>
            </div>                
        </div>
        <div class="row">
            <div class="col-sm-4 col-sm-offset-4 bottom-separation">
                <vue-paginator
                    :pagination="pagination"
                    @updatePage="getMarvelComics(pagination.current_page)"
                >                    
                </vue-paginator>
            </div>
        </div>
        <div v-show="loading" class="loading-screen row">
            <i class="fa fa-spinner fa-spin"></i>
        </div>
        <comic-modal :comicDetail="comicDetail"></comic-modal>
    </div>
</template>
<script>
import helper from '../js/helper';
import vuePaginator from './paginator.vue';
import characterForm from './characterForm.vue';
import comicBook from './comicBook.vue';
import comicModal from './comicBookModal.vue';

export default {
    mixins: [helper],
    components: {
        'vue-paginator': vuePaginator,
        'character-form': characterForm,
        'comic-book': comicBook,
        'comic-modal': comicModal
    },
    data() {
        return {
            searchTerm: '',
            books: {},
            comicsCharacters: [],
            characterUrl: 'v1/public/characters',
            defaultCharName: 'all',
            pagination: {
                total: 0,
                itemsPerPage: 10,
                current_page: 1             
            },
            comicDetail: {},
            loading: false         
        }
    },
    mounted() {
        this.checkStorage();
        this.checkBooks();
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
            this.loading = true;
            this.$http.get(apiUrl, query)
            .then(({data}) => {
                this.loading = false;
                this.pagination.total = data.data.total;
                this.comicsCharacters = data.data.results;
            }, (error) => {
                console.log(error);
            });
        },
        checkStorage() {
            let params = this.getFromStorage('backRouteParams');
            if (params) {
                if (params.name != this.defaultCharName) {
                    this.searchTerm = params.name;
                }
                this.getMarvelComics(params.pageNumber);
                return;
            }
            this.getMarvelComics();
        },
        checkBooks() {
            let books = this.getFromStorage('myFavourites');
            if (books) {
                this.books = books;
            }
        },
        openDetailModal(data) {
            this.comicDetail = data;
            $('#comic-detail').modal('show');
        }
    }
}
</script>