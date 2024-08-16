import { createApp } from 'vue';
import App from './App.vue';

// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure you import the styles
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create the Vuetify instance
const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

// Use Vuetify with the Vue app
app.use(vuetify);

app.mount('#app');
