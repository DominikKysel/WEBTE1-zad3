import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import SliderButton from './components/SliderButton.vue'
import VueMobileDetection from "vue-mobile-detection";

const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.use(bootstrap)
app.use(VueMobileDetection)
app.component('slider-button', SliderButton)
app.component('apex-chart', VueApexCharts)
app.mount('#app')
