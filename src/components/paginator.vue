<template>
    <ul class="pagination">
        <li v-if="pagination.current_page > 1">
            <a href="#" aria-label="Previous" @click.prevent="changeCurrentPage(pagination.current_page - 1)">
                <span aria-hidden="true"> < </span>
            </a>
        </li>
        <li v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}">
            <a href="#" @click.prevent="changeCurrentPage(page)">
                {{ page }}
            </a>
        </li>
        <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Next" @click.prevent="changeCurrentPage(pagination.current_page + 1)">
                <span aria-hidden="true"> > </span>
            </a>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: true          
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
                this.pagination.last_page = pages;
                var pagesArray = [];
                for (var i = 1; i <= pages; i++) {
                    pagesArray.push(i);
                }
                return pagesArray;

            }
            this.pagination.last_page = 0;
            this.pagination.current_page = 1;
        }
    },
    methods: {
        changeCurrentPage(page) {
            this.pagination.current_page = page;
            this.$emit('updatePage', page);
        }
    }
}
</script>