import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { AdMob } from '@admob-plus/ionic/ngx';
import {
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
  NativeAd,
  Events
} from 'admob-plus-cordova';
@Injectable()
export class AdmobFreeService {
  
  private admob: AdMob;

  constructor(public platform: Platform) {
    this.platform = platform;

    this.platform.ready().then(async () => {
      await this.admob.start();

      Object.values(Events).forEach((eventName) => {
        this.admob.on(eventName).subscribe((event) => {
          console.log(eventName, JSON.stringify(event));
        });
      });
    });
  }

  init(){
    this.platform.ready().then(async () => {
      await this.admob.start();
 
      Object.values(Events).forEach((eventName) => {
        this.admob.on(eventName).subscribe((event) => {
          console.log(eventName, JSON.stringify(event));
        });
      });
    });

    admob.requestTrackingAuthorization
  }

 
  async showNativeAd() {
    const ad = new NativeAd({
      adUnitId: '/267159116/SABCDigitalNewsiOS'
    });
    await ad.load();
    // await ad.show({
    //   x: 0,
    //   y: 30,
    //   width: window.screen.width,
    //   height: 100,
    // });

   

    await new Promise((resolve) =>
      setTimeout(() => {
        ad.hide(); 
        resolve(undefined);
      }, 5000)
    );

    await ad.showWith(document.getElementById('native-ad'));
  }
}
