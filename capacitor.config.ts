import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.almoqata3a.game',
  appName: 'AlMoqata3a',
  webDir: 'dist',
  android: {
    backgroundColor: '#0c0a09',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    // Web Audio and WebView persistence settings
  },
};

export default config;
