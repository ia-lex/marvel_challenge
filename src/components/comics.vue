<template>
    <div class="container-fluid">
        <h2 class="text-center">COMICS</h2>
        <button
            type="button"
            class="btn btn-danger"
            @click="chooseComics()"
        >
            Choose 3 for me
        </button>
        <div class="row">
            <div class="col-md-6" v-for="comic in comics">
                <comic-form
                    :comics="comic"
                    @comicDetail="openDetailModal(comic)"
                >   
                </comic-form>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-sm-offset-4 bottom-separation">
                <vue-paginator
                    :pagination="pagination"
                    @updatePage="getComics(pagination.current_page)"
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
import comicForm from './comicForm.vue';
import comicModal from './comicBookModal.vue';

export default {
    mixins: [helper],
    components: {
        'vue-paginator': vuePaginator,
        'comic-form': comicForm,
        'comic-modal': comicModal
    },
    data() {
        return {
            comics: [],
            characterComicsUrl: 'v1/public/characters/',
            pagination: {
                total: 0,
                itemsPerPage: 10,
                current_page: 1             
            },
            comicDetail: {},
            loading: false,
            randomComics: 3
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
            this.loading = true;
            this.$http.get(comicUrl, query)
            .then(({data}) => {
                this.pagination.total = data.data.total;
                this.comics = data.data.results;
                this.loading = false;
            }, (error) => {
                console.log(error);
            })
        },
        openDetailModal(data) {
            this.comicDetail = data;
            $('#comic-detail').modal('show');
        },
        chooseComics() {
            let books = this.getFromStorage('myFavourites');
            let comicArraySize = this.comics.length;
            let shuffledArray = this.arrayIndexShuffle(comicArraySize);
            let counter = 0;
            for (var i in shuffledArray) {
                let index = shuffledArray[i];
                let comicId = this.comics[index].id;
                if (Object.keys(books).toString().indexOf(comicId) == -1) {
                    let singleComic = {};
                    singleComic[comicId] = this.comics[index];
                    Object.assign(books, singleComic);
                    counter++;
                    if (counter == this.randomComics) {
                        break;
                    }
                }
            }
            this.setStorage('myFavourites', books);
        }
    }
}
</script>
<style>
</style>