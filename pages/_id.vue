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
                            <div class="container has-text-centered">
                                <h1 class="title">
                                    Confirm your attendance
                                </h1>
                                <h2 class="subtitle button-section">
                                    <span class="control">
                                        <button class="button is-light" @click="confirmAttendance(false)">
                                            I can't attend
                                        </button>
                                    </span>
                                    <span class="control">
                                        <button class="button is-dark" @click="confirmAttendance(true)">
                                            I'm going
                                        </button>
                                    </span>
                                </h2>
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
                        <a>#css</a> <a>#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal :active.sync="isDeclined">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        Sad to hear that you won't make it.
                        <a>#css</a> <a>#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
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
        async asyncData(route) {
            const {data} = await $axios.get('https://wedding-rsvp-9bf28.firebaseio.com/guests.json');

            return {guests: data};
        },
        computed: {

            attending() {

                return this.guest.attending || false;
            },
            name() {

                return this.guest.name || '';
            },
            guest() {

                return this.guests[this.index] || {};
            },
            index() {

                return this.guests.findIndex(g => g.id === this.$route.params.id);
            }
        },
        data() {
            return {
                isConfirmed: false,
                isDeclined: false,
                options: {
                    menu: '#menu',
                    anchors: ['welcome', 'venue', 'attire', 'confirmation'],
                },
                guests: [],
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

