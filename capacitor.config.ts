import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sabc.news',
  appName: 'sabc-news',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      HideKeyboardFormAccessoryBar: 'false',
      BackgroundColor: '0xff000000',
      ShowSplashScreenSpinner: 'false',
      orientation: 'portrait',
      ScrollEnabled: 'false',
      'android-minSdkVersion': '24',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'true',
      SplashScreen: 'screen',
      SplashScreenDelay: '2000',
      YouTubeDataApiKey: 'AIzaSyCJUB6orp7ibeDpJQjHo1sle92yx6xQDW0',
      AndroidXEnabled: 'true',
      GradlePluginKotlinEnabled: 'true',
      GradlePluginKotlinCodeStyle: 'official',
      AndroidPersistentFileLocation: 'Compatibility',
      LoadUrlTimeoutValue: '60000000',
      AndroidBlacklistSecureSocketProtocols: 'SSLv3,TLSv1'
    }
  }
};

export default config;
