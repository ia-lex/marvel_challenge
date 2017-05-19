<template>
    <div>
        <div class="row">
            <figure class="text-center">
                <img src="../assets/marvel_heroes.jpg">         
            </figure>
        </div>
        <div class="main-background">
            <router-view
                class="view"
                keep-alive
                transition
                transition-mode="out-in"
            >                
            </router-view>    
        </div>
    </div>
</template>
