import { createApp } from 'vue';
import 'uno.css';
import '@/styles/index.scss';

import { createHead } from '@vueuse/head';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';
// import { router, setupRouter } from '@/router';
import { worker } from '@/api/mocks/browser';
// import { setupRouterGuard } from '@/router/guard';
import App from './App.vue';
import AppLoading from '@/components/Common/AppLoading.vue';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

function setupApp() {
  const appLoading = createApp(AppLoading);
  appLoading.mount('#appLoading');
  const app = createApp(App);
  // 配置 store
  setupStore(app);
  // 多语言
  setupI18n(app);
  // 配置路由
  // setupRouter(app);
  // 路由守卫
  // setupRouterGuard(router);
  app.use(createHead()).mount('#app');
}

setupApp();
