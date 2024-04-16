import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { TabsPage } from "../tabs/tabs.page";
import {
  StreamingMedia,
  StreamingVideoOptions,
  StreamingAudioOptions,
} from "@ionic-native/streaming-media/ngx";
import { DomSanitizer } from "@angular/platform-browser";
declare var cordova: any;
@Component({
  selector: "app-radio",
  templateUrl: "radio.page.html",
  styleUrls: ["radio.page.scss"],
})
export class RadioPage {
  isPlaying: boolean = false;
  radioLogo: string = "";
  radioStation: string = "";
  myHtml;
  @ViewChild("AntFrame") iframe: ElementRef;
  @ViewChild("RadioAd1") radioad_1: ElementRef;
  @ViewChild("RadioAd2") radioad_2: ElementRef;
  @ViewChild("SAFM1") safm_1: ElementRef;

  radios: Array<any> = [
    [
      {
        name: "Ikwekwezi FM",
        id: "766",
        logo: "News_App_Logos-01_-_Ikwekwezi.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/IKWEKWEZIAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "IKWEKWEZI",
      },
      {
        name: "Lesedi FM",
        id: "767",
        logo: "News_App_Logos-02_-_Lesedi.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/LESEDIAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "LESEDI",
      },
      {
        name: "Ligwalagwala FM",
        id: "768",
        logo: "News_App_Logos-03_-_Ligwala.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/LIGWALAGWALAAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "LIGWALAGWALA",
      },
      {
        name: "Motsweding FM",
        id: "771",
        logo: "News_App_Logos-05_-_Motsweding.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/MOTSWEDINGAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "MOTSWEDING",
      },
      {
        name: "Munghana Lonene",
        id: "772",
        logo: "News_App_Logos-06_-_Munghana_Lonene_FM.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/MUNGANALONENEAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "MUNGANALONENE",
      },
      {
        name: "Phalaphala FM",
        id: "773",
        logo: "News_App_Logos-07_-_Phalaphala.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/PHALAPHALAAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "PHALAPHALA",
      },
      {
        name: "Thobela FM",
        id: "777",
        logo: "News_App_Logos-11_-_Thobela_FM.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/THOBELAAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "THOBELA",
      },
      {
        name: "Ukhozi FM",
        id: "779",
        logo: "News_App_Logos-14_-_Ukhozi.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/UKHOZIFMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "UKHOZIFM",
      },
      {
        name: "Umhlobo Wenene",
        id: "780",
        logo: "News_App_Logos-13_-_Umhlobo_Wenene.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/UMHLOBOWENENEAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "UMHLOBOWENENE",
      },
      {
        name: "X-K FM",
        id: "781",
        logo: "News_App_Logos-15_X-Kfm.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/XKFMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "XKFM",
      },
    ],
    [
      {
        name: "Channel Africa",
        id: "764",
        logo: "News_App_Logos-16_-_Channel_Africa.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/CA247AAC.aac?dist=sabc-news-mobi-app",
        FMURL: "CA247",
      },
      {
        name: "SAfm",
        id: "776",
        logo: "News_App_Logos-10_-_SAfm.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/SAFMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "SAFM",
      },
      {
        name: "Radio Sonder Grense (RSG)",
        id: "775",
        logo: "News_App_Logos-09_-_RSG.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/RSGAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "RSG",
      },
      {
        name: "Metro FM",
        id: "770",
        logo: "News_App_Logos-19_-_Metro_FM.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/METROFMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "METROFM",
      },
      {
        name: "5FM",
        id: "763",
        logo: "News_App_Logos-17_-_5fm.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/5FMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "5FM",
      },
      {
        name: "Radio 2000",
        id: "774",
        logo: "News_App_Logos-08_-_Radio_2000.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO2000AAC.aac?dist=sabc-news-mobi-app",
        FMURL: "RADIO2000",
      },
      {
        name: "Good Hope FM",
        id: "765",
        logo: "News_App_Logos-18_-_Good_Hope.png",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/GOODHOPEFMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "GOODHOPEFM",
      },
      {
        name: "Lotus FM",
        id: "769",
        logo: "News_App_Logos-04_-_Lotus.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/LOTUSFMAAC.aac",
        FMURL: "LOTUSFM",
      },
      {
        name: "truFM",
        id: "778",
        logo: "News_App_Logos-12_-_truFM.svg",
        adaptiveUrl:
          "https://playerservices.streamtheworld.com/api/livestream-redirect/LOTUSFMAAC.aac?dist=sabc-news-mobi-app",
        FMURL: "TRUFM",
      },
      // { name: "News on iono FM", id: null, logo: "iono_fm_logo.svg",url:"https://iono.fm/p/135" },
    ],
  ];

  constructor(
    private tabs: TabsPage,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  playRadioStation(radio) {
    if (radio.id == null) {
      cordova.InAppBrowser.open(radio.url, "_blank", "location=no");
      // window.open(radio.url, "_SYSTEM");
    } else {
      this.tabs.play(radio);
      // window.open(radio.url, "_SYSTEM");
    }
  }

  ionViewDidEnter() {
    // this.radioAd1();
    // this.radioAd2();
    this.safm1();
  }

  async radioAd1() {
    this.radioad_1.nativeElement.innerHTML =
      '<iframe scrolling="no" id="radio-banner1" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById(
      "radio-banner1"
    ) as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      "<!doctype html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        '<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>' +
        "</head>" +
        "<body>" +
        "<div id='radioad-1'>" +
        "<script>" +
        "window.googletag = window.googletag || {cmd: []};" +
        "googletag.cmd.push(function() {" +
        "googletag.defineSlot('/267159116/SABCDigitalNewsMobileLeaderboard5', [[320,50]], 'radioad-1').addService(googletag.pubads());" +
        "googletag.pubads().enableSingleRequest();" +
        "googletag.pubads().collapseEmptyDivs();" +
        "googletag.enableServices();" +
        "googletag.display('radioad-1');" +
        " });" +
        "</script>" +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }

  ngOnInit() {
    this.http
      .get("assets/i.html", { responseType: "text" })
      .subscribe((res) => {
        this.myHtml = res;
      });
  }

  async radioAd2() {
    this.radioad_2.nativeElement.innerHTML =
      '<iframe style="width: 100%; height: 90px !important;" scrolling="no" id="radio-banner2" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById(
      "radio-banner2"
    ) as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      "<!doctype html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        '<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>' +
        "</head>" +
        "<body>" +
        "<div id='radioad-2'>" +
        "<script>" +
        "window.googletag = window.googletag || {cmd: []};" +
        "googletag.cmd.push(function() {" +
        "googletag.defineSlot('/267159116/SABCDigitalNewsMobileLeaderboard4', [[320,50]], 'radioad-2').addService(googletag.pubads());" +
        "googletag.pubads().enableSingleRequest();" +
        "googletag.pubads().collapseEmptyDivs();" +
        "googletag.enableServices();" +
        "googletag.display('radioad-2');" +
        " });" +
        "</script>" +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }
  async safm1() {
    this.safm_1.nativeElement.innerHTML =
      '<iframe style="min-height:500px;height: 100%; width: 100%;" id="watch-banner1" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById(
      "watch-banner1"
    ) as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      "<!doctype html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        "</head>" +
        "<body>" +
        "<div id='watchad-1'>" +
        '<iframe src="https://omny.fm/shows/safm-sunrise-1/playlists/podcast/embed?style=cover&amp;image=1&amp;share=1&amp;download=1&amp;description=1&amp;subscribe=1&amp;playlistimages=1&amp;playlistshare=1" ' +
        'style="min-height:500px;height: 100%; width: 100%;" frameborder="0" ></iframe>' +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }
  // ngOnInit() {
  //   this.tabs.initAds();
  // }
}
