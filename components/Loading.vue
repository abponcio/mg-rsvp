<template lang="html">
    <transition name="fade">
        <div class="loading-page" v-if="loading">
            <img src="@/assets/Infinity-5s-200px.svg" alt="Infinity"/>
            <transition name="fade">
                <h2 v-if="message">{{message}}...</h2>
            </transition>
        </div>
    </transition>
</template>

<script>

    import list from '@/assets/loading';

    export default {

        data: () => ({

            loading: true,
            message: '',
        }),
        methods: {
            finish() {

                this.loading = false;
            },
            start() {

                this.loading = true;
            },
        },
        mounted() {

            window.loadInterval = setInterval(() => this.message = list[Math.floor(Math.random() * list.length)], 1000);
            setTimeout(() => this.finish(), 5000);
        },
        watch: {

            loading() {

                if (!this.loading) clearInterval(window.loadInterval);
            }
        }
    };

</script>

<style scoped>
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        background-image: url(~assets/lightpaperfibers.png);
        text-align: center;
        padding-top: 200px;
        font-size: 30px;
        font-family: sans-serif;
        z-index: 999999;
    }

    h2 {
        font-family: 'Cormorant Garamond';
        color: #363636;
    }
</style>