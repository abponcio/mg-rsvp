<template lang="html">
    <transition name="fade">
        <div class="loading-page" v-if="loading">
            <VueLoader />
            <transition name="fade">
                <h2 v-if="message">{{message}}...</h2>
            </transition>
        </div>
    </transition>
</template>

<script>

    import VueLoader from '@/assets/Infinity-5s-200px.svg';
    import list from '@/assets/loading';

    export default {
        components: {

            VueLoader,
        },
        data: () => ({

            loading: true,
            message: '',
        }),
        methods: {
            finish () {

                this.loading = false;
            },
            start () {

                this.loading = true;
            },
        },
        mounted() {

            const changeMessage = setInterval(() => this.message = list[Math.floor(Math.random() * list.length)], 1000);

            setTimeout(() => {

                this.finish();
                clearInterval(changeMessage);
            }, 5000);
        },
    };

</script>

<style scoped>
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #aaaaaa;
        text-align: center;
        padding-top: 200px;
        font-size: 30px;
        font-family: sans-serif;
        z-index: 999999;
    }

    h2 {
        font-family: 'Cormorant Garamond';
        color: #fff;
    }
</style>