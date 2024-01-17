import { createApp } from "vue";
import "./css/main.css"

// Oruga
import Oruga from '@oruga-ui/oruga-next'
// import '@oruga-ui/oruga-next/dist/oruga.css'
// import '@oruga-ui/oruga-next/dist/oruga-full.css'
// import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'

import '@oruga-ui/theme-oruga/dist/oruga-full.min.css';

//Material Design
import "@mdi/font/css/materialdesignicons.min.css"


import axios from 'axios'


import App from "./App.vue"
import router from "./router"

const app = createApp(App).use(Oruga).use(router)

app.config.globalProperties.$axios = axios
window.axios = axios

app.mount("#app")
