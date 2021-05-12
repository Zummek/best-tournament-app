declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    HOST: string;
    PORT: string;
    SSL: string;
    DEFAULT_LOCALE: string;
  }
}
