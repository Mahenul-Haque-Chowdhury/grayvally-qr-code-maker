declare module '@vitejs/plugin-react' {
  import type { Plugin } from 'vite';

  const react: () => Plugin | Plugin[];
  export default react;
}
