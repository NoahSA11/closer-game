import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Bundle ID — format: com.yourname.appname
  // This becomes your App Store / Play Store unique identifier.
  // Once set and published, do NOT change this.
  appId: 'com.closergame.app',
  appName: 'Closer',

  // Points Capacitor to your web files.
  // Since there's no build step, the root directory IS the web root.
  webDir: '.',

  // Prevents Capacitor from opening a live-reload server in production.
  bundledWebRuntime: false,

  plugins: {
    SplashScreen: {
      // Splash screen shows while the app loads.
      // backgroundColor should match the deep green: #1E3A2F
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#1E3A2F',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#BF9447'
    },
    StatusBar: {
      // Makes the status bar match the deep green header.
      style: 'DARK',
      backgroundColor: '#1E3A2F',
      overlaysWebView: false
    }
  },

  ios: {
    // Prevents the app from opening the in-app browser for external links.
    // External links will open in Safari instead.
    allowsLinkPreview: false,
    // Scroll bounce effect — disable for a native-feeling fixed layout.
    scrollEnabled: true,
    // Minimum iOS version to target.
    // 15.0 covers ~95% of active iPhones (as of 2025).
    deploymentTarget: '15.0'
  },

  android: {
    // Matches the Tailwind config green for the Android nav bar.
    backgroundColor: '#1E3A2F',
    // Minimum Android API level. 26 = Android 8.0 (covers ~98% of devices).
    minSdkVersion: 26,
    // Enables smooth hardware-accelerated rendering.
    allowMixedContent: false
  }
};

export default config;
