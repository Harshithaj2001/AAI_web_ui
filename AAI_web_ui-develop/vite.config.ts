import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Dev-only: proxy /__sb_functions/* → {VITE_SUPABASE_URL}/functions/v1/*
 * so the browser only talks to localhost (same-origin). That avoids CORS preflight
 * hitting Supabase’s gateway, which rejects OPTIONS when JWT verification is enabled.
 * Production still requires `verify_jwt = false` (or deploy --no-verify-jwt) for direct calls.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseOrigin = env.VITE_SUPABASE_URL?.replace(/\/$/, '') ?? '';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@context': path.resolve(__dirname, './src/context'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@services': path.resolve(__dirname, './src/services'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      sourcemap: true,
    },
    server:
      mode === 'development' && supabaseOrigin.startsWith('https://')
        ? {
            proxy: {
              '/__sb_functions': {
                target: supabaseOrigin,
                changeOrigin: true,
                secure: true,
                rewrite: (p) => p.replace(/^\/__sb_functions/, '/functions/v1'),
              },
            },
          }
        : {},
  };
});
