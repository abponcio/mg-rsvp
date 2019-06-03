<template>

    <div>
        <full-page ref="fullpage" id="fullpage" :options="options">
            <section class="section">
                <transition name="fade">
                    <div class="hero is-white is-bold is-fullheight">
                        <div class="hero-body">
                            <div class="container has-text-centered">
                                <h1 class="title">
                                    Hello, {{name}}
                                </h1>
                                <h2 class="subtitle">
                                    You are invited at Grace and Mico's private lunch.
                                </h2>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
            <section class="section">
                <transition name="fade">
                    <div class="hero is-white is-bold is-fullheight">
                        <div class="hero-body">
                            <div class="container has-text-centered">
                                <h1 class="title">
                                    THE VENUE
                                </h1>
                                <hr>
                                <h1 class="title">
                                    We reserved one seat for you
                                </h1>
                                <h2 class="subtitle">
                                    Join us at at HCG. The event starts at 12:00 PM on December 16, 2019
                                </h2>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
            <section class="section">
                <transition name="fade">
                    <div class="hero is-light is-bold is-fullheight">
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
                    <div class="hero is-light is-bold is-fullheight">
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
                                        Something came up?
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
                    anchors: ['welcome', 'venue', 'attire', 'confirmation'],
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
</style>

