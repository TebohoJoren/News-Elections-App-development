import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  ToastController,
  MenuController,
  IonRouterOutlet,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { NewsPage } from "../app/news/news.page";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { Router, NavigationEnd } from "@angular/router";
import { Cordova } from "@ionic-native/core";
declare var cordova: any;
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";
import videojs from "video.js";

@Component({
  providers: [NewsPage],
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  public accepted = false;
  public appPages = [
    /**
    {
      title: "@SABCNews",
      link: "https://twitter.com/SABCNews",
      thumbnail: "logo-twitter",
    },
    */
    {
      title: "@SABCNews",
      link: "https://www.instagram.com/sabcnewsonline/",
      thumbnail: "logo-instagram",
    },
  ];
  subscription: any;
  spamming: boolean = false;
  lastBack: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private newspage: NewsPage,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    private storage: Storage,
    private iab: InAppBrowser
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(0, () => {
      let closeDelay = 2000;
      let spamDelay = 500;

      if (
        Date.now() - this.lastBack < closeDelay &&
        Date.now() - this.lastBack > spamDelay
      ) {
        navigator["app"].exitApp();
      } else {
        if (!this.spamming) {
          this.presentToast();
        }
      }
      this.lastBack = Date.now();
    });

    storage.get("settings").then((val) => {
      if (val == null) return;
      const json = JSON.parse(val);
      var root = document.getElementsByTagName("html")[0];
      if (json.text) {
        root.className = root.className + " large-font";
      } else {
        root.className = root.className.replace(
          new RegExp("(?:^|\\s)" + "large-font" + "(?:\\s|$)"),
          " "
        );
      }
    });
    this.initPushwoosh();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga("send", "page", event.urlAfterRedirects);
      }
    });
  }

  change(thumb: string) {
    if (thumb === "logo-youtube") {
    }
  }
  async presentToast() {
    this.ok();
    console.log("await toast");
    let toast = await this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle",
    });
    toast.present();
  }

  openFB() {
    this.ok();
    cordova.InAppBrowser.open(
      "https://www.facebook.com/SABCNews/",
      "_blank",
      "location=no"
    );
  }

  openX() {
    this.ok();
    cordova.InAppBrowser.open(
      "https://twitter.com/SABCNews",
      "_blank",
      "location=no"
    );
  }
  openYouTube() {
    this.ok();
    cordova.InAppBrowser.open(
      "https://www.youtube.com/user/sabcdigitalnews",
      "_blank",
      "location=no"
    );
  }
  openSocialAccount(socialurl) {
    this.ok();
    cordova.InAppBrowser.open(socialurl, "_blank", "location=no");
  }
  openEmail() {
    this.ok();
    cordova.InAppBrowser.open(
      "https://www.sabc.co.za/sabc/contact",
      "_blank",
      "location=no"
    );
  }
  openElections() {
    this.ok();
    cordova.InAppBrowser.open(
      "https://www.sabcnews.com/sabcnews/category/lge-2021/",
      "_blank",
      "location=no"
    );
  }
  openPrivacyPolicies() {
    this.ok();
    cordova.InAppBrowser.open(
      "https://www.sabc.co.za/sabc/disclaimer/",
      "_blank",
      "location=no"
    );
  }

  openElectionsSite() {
    this.ok();
    let browser = this.iab.create("https://elections.sabc.co.za/", "_system");
    browser.show();
    //cordova.InAppBrowser.open("https://elections.sabc.co.za/", '_blank', 'location=no');
  }

  openTermsConditions() {
    this.ok();
    cordova.InAppBrowser.open(
      "http://www.sabcsales.co.za/sabcsales/?p=1844",
      "_blank",
      "location=no"
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushwoosh();
      this.statusBar.hide();
    });
  }
  //   initPushwoosh() {
  //     //console.log(typeof(cordova));
  //     if (typeof(cordova) == 'undefined' || typeof(pushwoosh) == 'undefined')
  //         return;
  //     var pushwoosh = cordova.require("pushwoosh-cordova-plugin.PushNotification");

  //     window.cordova = cordova;
  //     //window.pushwoosh = pushwoosh;

  //     console.log('initializing pushwoosh');

  //     // Should be called before pushwoosh.onDeviceReady
  //     document.addEventListener('push-notification', function(event:any) {
  //     var notification = event.notification;
  //     // handle push open here
  //     });

  //     // Initialize Pushwoosh. This will trigger all pending push notifications on start.
  //     pushwoosh.onDeviceReady({
  //     appid: "886E8-4D61B",
  //     projectid: "953880387935",
  //     serviceName: ""
  //     });
  // }
  openFavourites() {}
  public filterArticles(category): void {
    this.newspage.filterArticles(category);
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribe(() => {
      localStorage.setItem("read", "stopping");
      const obj = new TextToSpeech();
      obj.stop();
      console.log("suppose to close:");
      navigator["app"].exitApp();
    });
  }

  initPushwoosh() {
    //var pushNotification = (<any>window).plugins.pushNotification;
    if (typeof cordova == "undefined" || typeof pushNotification == "undefined")
      return;
    var pushNotification = cordova.require(
      "pushwoosh-cordova-plugin.PushNotification"
    );

    //set push notifications handler
    document.addEventListener("push-notification", function (event) {
      var message = (<any>event).notification.message;
      var userData = (<any>event).notification.userdata;

      alert("Push message opened: " + message);
      console.info(JSON.stringify((<any>event).notification));

      //dump custom data to the console if it exists
      if (typeof userData != "undefined") {
        console.warn("user data: " + JSON.stringify(userData));
      }
    });

    document.addEventListener("push-receive", function (event) {
      var message = (<any>event).notification.message;
      var userData = (<any>event).notification.userdata;

      alert("Push message received: " + message);
      console.info(JSON.stringify((<any>event).notification));

      //dump custom data to the console if it exists
      if (typeof userData != "undefined") {
        console.warn("user data: " + JSON.stringify(userData));
      }
    });

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({
      projectid: "1032686402849",
      appid: "C8355-BF923",
      serviceName: "",
    });

    //register for push notifications
    var app = this;
    pushNotification.registerDevice(
      function (status) {
        alert("registered with token: " + status.pushToken);
        //app.onPushwooshInitialized(pushNotification);
      },
      function (status) {
        alert("failed to register: " + status);
        console.warn(JSON.stringify(["failed to register ", status]));
      }
    );
  }

  // Stop any video js instance from playing when changig screens
  ok() {
    if (videojs("player").src != null || videojs("player").src != undefined) {
      videojs("player").pause();
    }

    if (
      videojs("playerLehae").src != null ||
      videojs("playerLehae").src != undefined
    ) {
      videojs("playerLehae").pause();
    }
    
  }
}
