// type Fn = (...arg: any) => any;
declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type EmitType = (event: string, ...args: any[]) => void;
declare type TargetContext = '_self' | '_blank';
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

interface Window {
  $loadingBar: import('naive-ui').LoadingBarProviderInst;
  $dialog: import('naive-ui').DialogProviderInst;
  $message: import('naive-ui').MessageProviderInst;
  $notification: import('naive-ui').NotificationProviderInst;
}
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}
