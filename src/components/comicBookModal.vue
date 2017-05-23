<template>
    <div id="comic-detail" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{{ comicDetail.title }}</h4>
                </div>
                <div class="modal-body">
                    <article class="comic-book-detail">
                        <figure>
                            <img :src="comicDetail.thumbnail | imageFullPath">
                        </figure>
                        <div class="comic-book-description">
                            <p>
                                {{ comicDetail.description ? comicDetail.description : 'No description'}}
                            </p>
                        </div>
                    </article>
                </div>
                <div class="modal-footer">
                    
                </div>
            </div>
        </div>
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
        comicDetail: {
            type: Object,
            required: true
        }
    }
}
</script>
<style>
</style>