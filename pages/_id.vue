<template>

    <div :class="{'is-hidden': this.$nuxt.$loading.loading}">
        <full-page ref="fullpage" id="fullpage" :options="options">
            <section class="section is-relative">
                <img class="bottom-leaves" src="@/assets/home/top-left-below-leaves.png" alt="Bottom Leaves"/>
                <img class="top-leaves" src="@/assets/home/top-left-above-leaves.png" alt="Top Leaves"/>
                <img class="left-splatter" src="@/assets/home/left-splatter.png" alt="Left Splatter"/>
                <img class="top-splatter" src="@/assets/home/top-splatter.png" alt="Top Splatter"/>
                <img class="top-right-leaves" src="@/assets/home/top-right-leaves.png" alt="Top Right Leaves"/>
                <img class="right-leaves" src="@/assets/home/right-leaves.png" alt="Right Leaves"/>
                <img class="bottom-left-leaves" src="@/assets/home/bottom-left-leaves.png" alt="Bottom Left Leaves"/>
                <transition name="fade">
                    <div class="hero is-bold is-fullheight">
                        <div class="hero-body">
                            <div class="container has-text-centered">
                                <h2 class="subtitle">
                                    Hello, {{name}}
                                </h2>
                                <h2 class="subtitle">
                                    We, 
                                </h2>
                                <h1 class="title">
                                    Mico & Grace
                                </h1>
                                <h3 class="subtitle">
                                    Invite you to a private gathering to celebrate our love
                                </h3>
                                <h3 class="subtitle">
                                    December 00.2019 | 0:00 pm <br/>
                                    Lazat Fil-Asian Restaurant <br/>
                                    76 Scout Limbaga St. Tomas Morato, Quezon City
                                </h3>

                                <a class="button is-success is-outlined" style="max-width: 100%; width: 260px;" href="#rsvp">RSVP</a>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
            <section class="section">
                <transition name="fade">
                    <div class="hero is-bold is-fullheight">
                        <div class="hero-body">
                            <div class="container has-text-centered">
                                <h1 class="title">
                                    Come in with your best white semi-format attire
                                </h1>
                                <h2 class="subtitle">
                                    Shows pegs for male or female.
                                </h2>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
            <section class="section">
                <transition name="fade">
                    <div class="hero is-bold is-fullheight">
                        <div class="hero-body">
                            <div class="container has-text-centered" v-if="guest.attending === undefined">
                                <h1 class="title">
                                    Confirm your attendance
                                </h1>
                                <h2 class="subtitle button-section">
                                    You can still have a chance to change your mind
                                </h2>
                                <span class="control">
                                    <button class="button is-dark is-outlined" @click="confirmAttendance(false)">
                                        I can't attend
                                    </button>
                                </span>
                                <span class="control">
                                    <button class="button is-dark" @click="confirmAttendance(true)">
                                        I'm going
                                    </button>
                                </span>
                            </div>
                            <div class="container has-text-centered" v-else>
                                <div v-if="guest.attending">
                                    <h1 class="title">
                                        You have confirmed on attending
                                    </h1>
                                    <h2 class="subtitle button-section">
                                        Did something came up?
                                    </h2>
                                    <button class="button is-dark" @click="confirmAttendance(false)">
                                        Sorry, I can't attend
                                    </button>
                                </div>
                                <div v-else>
                                    <h1 class="title">
                                        Declined on attending
                                    </h1>
                                    <h2 class="subtitle button-section">
                                        You can still change your mind
                                    </h2>
                                    <button class="button is-dark" @click="confirmAttendance(true)">
                                        I'm going
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
        </full-page>

        <b-modal :active.sync="isConfirmed">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <h1>Thank you for accepting our invitation</h1>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal :active.sync="isDeclined">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        Sad to hear that you won't make it.
                    </div>
                </div>
            </div>
        </b-modal>
    </div>

</template>


<script>
    
    import $axios from 'axios';
    import {FullPage} from 'vue-fullpage.js';

    export default {
        async asyncData({params, redirect}) {
            const {data} = await $axios.get('https://wedding-rsvp-9bf28.firebaseio.com/guests.json');
            const index = data.findIndex(g => g.id === params.id);

            if (index < 0) redirect('/');

            return {guest: data[index], index};
        },
        computed: {

            attending() {

                return this.guest.attending;
            },
            name() {

                return this.guest.name || '';
            },
        },
        data() {

            return {

                index: null,
                isConfirmed: false,
                isDeclined: false,
                options: {
                    menu: '#menu',
                    anchors: ['hello', 'ootd', 'rsvp'],
                },
                guest: null,
            }
        },
        components: {

            FullPage,
        },
        methods: {

            async confirmAttendance(value) {

                if (value) {

                    this.guest.attending = true;
                    await $axios.patch(`https://wedding-rsvp-9bf28.firebaseio.com/guests/${this.index}/.json`, this.guest);

                    return this.isConfirmed = true;
                }
                
                this.guest.attending = false;
                await $axios.patch(`https://wedding-rsvp-9bf28.firebaseio.com/guests/${this.index}/.json`, this.guest);
                return this.isDeclined = true;
            },
        },
        transition: 'fade',
    };
</script>

<style scoped>
    .section {
        padding: 0;
    }
    #fullpage {
        background-image: url(~assets/lightpaperfibers.png);
    }
    .container {
        z-index: 5;
    }
    .bottom-leaves {
        position: absolute;
        top: -20px;
        left: -70px;
        z-index: 1;
    }
    .top-leaves {
        position: absolute;
        top: -62px;
        left: -70px;
        z-index: 2;
    }
    .left-splatter {
        position: absolute;
        top: -97px;
        left: -556px;
        z-index: 2;
    }
    .top-splatter {
        position: absolute;
        top: -328px;
        left: 240px;
        z-index: 2;
    }
    .bottom-left-leaves {
        position: absolute;
        bottom: 80px;
        left: 40px;
        z-index: 2;
    }
    .right-leaves {
        position: absolute;
        top: 250px;
        right: 200px;
        z-index: 2;
    }
    .top-right-leaves {
        position: absolute;
        top: 10px;
        right: 360px;
        z-index: 2;
    }
</style>

