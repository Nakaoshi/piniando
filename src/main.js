import {createPinia} from 'pinia'; 
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'


const app = createApp(App)
app.use(createPinia(), VueAxios, axios)
app.config.globalProperties.$axios = axios;
app.mount('#app');
