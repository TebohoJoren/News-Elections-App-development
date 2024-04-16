import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import {
  NativeHttpModule,
  NativeHttpBackend,
  NativeHttpFallback,
} from "ionic-native-http-connection-backend";

import { IonicStorageModule } from "@ionic/storage";
import {
  IonicModule,
  IonicRouteStrategy,
  Platform,
  ModalController,
  IonRouterOutlet,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  HttpBackend,
  HttpXhrBackend,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { YtProvider } from "./provider/youtube/yt";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Insomnia } from "@ionic-native/insomnia/ngx";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { AdmobFreeService } from "./services/admobfree.service";
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { DeviceOrientation } from "@ionic-native/device-orientation/ngx";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { AppAvailability } from "@awesome-cordova-plugins/app-availability/ngx";
import { PrivacyPoliciePipe } from "./privacy-policie.pipe";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";
import { ReaderStopModalPageModule } from "./modals/reader/reader-stop-modal/reader-stop-modal.module";
//import { VideoPlayer } from "@ionic-native/video-player/ngx";
@NgModule({
  declarations: [AppComponent, PrivacyPoliciePipe],
  imports: [
    NativeHttpModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    HttpClientModule,
    ReaderStopModalPageModule,
  ],
  providers: [
    StreamingMedia,
    InAppBrowser,
    Dialogs,
    StatusBar,
    SplashScreen,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Window, useValue: window },
    YtProvider,
    SocialSharing,
    Insomnia,
    AdmobFreeService,
    ScreenOrientation,
    DeviceOrientation,
    //VideoPlayer,
    {
      provide: HttpBackend,
      useClass: NativeHttpFallback,
      deps: [Platform, NativeHttpBackend, HttpXhrBackend],
    },
    AppVersion,
    AppAvailability,
    ModalController,
    IonRouterOutlet,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
