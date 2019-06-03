<template>

    <full-page ref="fullpage" id="fullpage" :options="options">
        <section class="section">
            <transition name="fade">
                <div class="hero is-primary is-bold is-fullheight">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <h1 class="title">
                                Welcome
                            </h1>
                            <h2 class="subtitle">
                                Landing site for none users
                            </h2>
                        </div>
                    </div>
                </div>
            </transition>
        </section>
    </full-page>

</template>


<script>
    import {FullPage} from 'vue-fullpage.js';

    export default {

        data() {
            return {
                options: {
                    menu: '#menu',
                    anchors: ['welcome'],
                },
            }
        },
        components: {

            FullPage,
        },
    };
</script>

<style>
    .section {
        padding: 0;
    }
</style>

