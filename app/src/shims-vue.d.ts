declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

declare module '*.svg' {
  import { DefineComponent } from 'vue';
  const svg: DefineComponent<{}, {}, any>
  export default svg
}
