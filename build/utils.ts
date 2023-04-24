export interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_DROP_CONSOLE: boolean;
}

export function wrapperEnv(envConf: Record<string, any>): ViteEnv {
  const viteEnv: Partial<ViteEnv> = {};
  for (const key of Object.keys(envConf)) {
    let realname = envConf[key].replace(/\\n/g, '\n');
    realname = realname === 'true' ? true : realname === 'false' ? false : realname;
    if (key === 'VITE_PORT') realname = Number(realname);
    if (key === 'VITE_PROXY' && realname) {
      try {
        realname = JSON.parse(realname.replace(/'/g, '"'));
      } catch (error) {
        realname = '';
      }
    }
    viteEnv[key as keyof ViteEnv] = realname;
    if (typeof realname === 'string') process.env[key] = realname;
    else if (typeof realname === 'object') process.env[key] = JSON.stringify(realname);
  }
  return viteEnv as ViteEnv;
}
