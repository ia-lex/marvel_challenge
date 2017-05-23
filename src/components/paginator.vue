<template>
    <div>
        <div class="input-group">
            <span class="input-group-btn">
                <button 
                    type="button" 
                    class="btn btn-secondary" 
                    @click="changeCurrentPage(false)"
                >
                    <
                </button>
            </span>
            <input 
                type="number" 
                class="form-control" 
                placeholder="Page number ..." 
                v-model="actualPage"
            >
            <span class="input-group-btn">
                <button 
                    type="button" 
                    class="btn btn-secondary" 
                    @click="changeCurrentPage(true)"
                >
                    >       
                </button>
            </span>
            <span class="input-group-addon">out of {{ pagesNumber }}</span>
        </div>
    </div>
</template>
<script>
var _ = require('lodash');

export default {
    props: {
        pagination: {
            type: Object,
            required: true          
        }
    },
    watch: {
        actualPage: function() {
            this.checkValue();
        }
    },
    data() {
        return {
            actualPage: 1,
            totalPages: 0
        }
    },
    computed: {
        pagesNumber: function() {
            if (this.pagination.itemsPerPage < this.pagination.total) {
                let pages = parseInt(this.pagination.total / this.pagination.itemsPerPage);
                let itemsRemain = this.pagination.total % this.pagination.itemsPerPage;

                if (itemsRemain > 0) {
                    pages++;
                }
                this.totalPages = pages;
                return this.totalPages;
            } else {
                return this.totalPages;
            }
        }
    },
    methods: {
        changeCurrentPage(direction) {
            if (direction) {
                this.actualPage++;
            } else {
                this.actualPage--;
            }
        },
        checkValue: _.debounce(function() {
            if (this.actualPage > 0 && this.actualPage <= this.totalPages) {
                console.log(this.actualPage);
                this.pagination.current_page = this.actualPage;
                this.$emit('updatePage', this.actualPage);
            }
        }, 800)
    }
}
</script>