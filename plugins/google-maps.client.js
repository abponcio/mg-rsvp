import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyD0d-JedaWJKhHbxF_UMqwgNvA2pZc5-Ts",
    libraries: "places"
  }
});