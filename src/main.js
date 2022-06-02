import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
//import { fab } from '@fortawesome/free-solid-svg-icons';

library.add(faCircle,faCircleCheck)
//library.add(fab);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon )
app.mount('#app')
