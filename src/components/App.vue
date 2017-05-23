<template>
    <div class="main-header">
        <div>
            <figure>
                <img src="../assets/marvel_logo.jpg">         
            </figure>
        </div>
        <div class="main-background">
            <router-view
                keep-alive
            >                
            </router-view>    
        </div>
        <div>
            <footer class="main-footer">
                <h6>
                    Grability
                </h6>
                <div>
                    <img src="../assets/grability-logo.png">
                </div>
            </footer>
        </div>
    </div>
</template>
