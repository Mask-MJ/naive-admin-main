import path from 'node:path';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import glsl from 'vite-plugin-glsl';
import Inspect from 'vite-plugin-inspect';
import { configAutoImportPlugin } from './autoImport';

export function createVitePlugins(): PluginOption[] {
  return [
    vue(),
    vueJsx(),
    mkcert(),
    VueI18nPlugin({
      runtimeOnly: true,
      include: [path.resolve(process.cwd(), 'src/locales/lang/**')],
    }),
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue', '**/modal/*', '**/data.ts'],
    }),
    Layouts(),
    Unocss(),
    // glsl(),
    ...configAutoImportPlugin(),
    Inspect(),
  ];
}
