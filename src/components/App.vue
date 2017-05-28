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
<style lang="scss">
/*The webpack loaders is already 
configured to use either 
this style or the /static/css/style.css 
file, it means that you could use classes in here
or copy paste into static css file*/
/*.main-background {
    background-color: rgba(242, 244, 247, 0.8);
}*/
</style>
