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
                                    Hello, {{guest.name}}
                                </h2>
                                <h2 class="subtitle mt-2">
                                    We,
                                </h2>
                                <h1 class="title big-title">
                                    Mico & Grace
                                </h1>
                                <h3 class="subtitle smaller">
                                    invites you to a private gathering to celebrate our love
                                </h3>
                                <h3 class="subtitle smaller">
                                    December 23.2019 | 11:00 am <br/>
                                    <a href="https://www.romulocafe.com/rc-quezoncity" target="_blank" class="has-text-link">Romulo Cafe Restaurant</a> <br/>
                                    32 Dr. Scout Lazcano corner Scout Tuason Tomas Morato, Quezon City
                                </h3>

                                <a class="button is-success is-outlined" style="max-width: 100%; width: 260px;" href="#map">Location</a>
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
                                    #ootd
                                </h1>
                                <h2 class="subtitle normal">
                                    (outfit on that day)
                                </h2>
                                <div class="columns">
                                    <div class="column">
                                        <div class="columns">
                                            <div class="column">
                                                WHITE<br/>
                                                Smart Casual
                                            </div>
                                            <div class="column">
                                                image
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        Long image
                                    </div>
                                    <div class="column">
                                        Long image
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
            <section class="section">
                <transition name="fade">
                    <div class="hero is-bold is-fullheight">
                        <div class="hero-body" style="justify-content: center;">
                            <GmapMap
                                :center="{lat:14.6312494, lng:121.030342}"
                                :zoom="18"
                                map-type-id="terrain"
                                style="width: 80vw; height: 80vh; align-items: center; justify-content: center;"
                                class="is-flex"
                                :options="mapOptions"
                                >
                                <GmapMarker
                                    :position="google && new google.maps.LatLng(14.6312494, 121.030342)"
                                    :clickable="true"
                                    :draggable="false"
                                    title="Romulo Cafe"
                                    @click="redirectUrl"
                                />
                            </GmapMap>
                        </div>
                    </div>
                </transition>
            </section>
        </full-page>
    </div>

</template>


<script>

    import $axios from 'axios';
    import {FullPage} from 'vue-fullpage.js';
    import SideScroll from '@/components/SideScroll';
    import {gmapApi} from 'vue2-google-maps';

    export default {

        components: {

            SideScroll,
        },
        computed: {

            guest() {

                return this.guests.find(g => g.id === parseInt(this.$route.params.id)) || {name: 'Guest'};
            },
            google: gmapApi,
        },
        data() {

            return {

                index: null,
                isConfirmed: false,
                isDeclined: false,
                options: {
                    menu: '#menu',
                    anchors: ['hello', 'ootd', 'map'],
                },
                guests: [

                    {

                        id: 1,
                        name: 'User'
                    },
                ],
                mapOptions: {

                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                    disableDefaultUi: false,
                    styles: [
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {"color": "#e9e9e9"},
                                {"lightness": 17}
                            ],
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                    ],
                },
            };
        },
        components: {

            FullPage,
        },
        methods: {

            redirectUrl() {

                window.open("https://www.google.com/maps/place/Romulo+Caf%C3%A9/@14.6312494,121.030342,17z/data=!3m1!4b1!4m5!3m4!1s0x3397b64cd960c71b:0x9373558dba39b804!8m2!3d14.6312442!4d121.0325307", "_blank");
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
    .title {
        font-family: 'Paduka Script';
        font-size: 10rem;
        font-weight: 200;
        margin-bottom: 0;
    }
    .big-title {

        font-family: 'Paduka Script';
        font-size: 15rem;
        font-weight: 200;
    }
    .subtitle {
        font-size: 3rem;
    }
    .subtitle.normal {
        font-size: 1.5rem;
    }
    .subtitle.mt-2 {
        margin-top: 1rem;
    }
    .subtitle.smaller {
        font-size: 2rem;
    }
    .button {
        font-size: 2rem;
    }
</style>

