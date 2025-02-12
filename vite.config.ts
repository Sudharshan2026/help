import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

// vite.config.js
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     allowedHosts: ['38a6-2409-40f4-6-ef23-9cff-c25f-5a4e-8475.ngrok-free.app'],
//   },
// });

// vite.config.ts
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     allowedHosts: ['b78c-2409-40f4-6-ef23-9cff-c25f-5a4e-8475.ngrok-free.app'],
//   },
// });
