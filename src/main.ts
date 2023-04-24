import { createApp } from 'vue';
import 'uno.css';
import './style.css';
import App from './App.vue';
import { worker } from '@/api/mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

createApp(App).mount('#app');
