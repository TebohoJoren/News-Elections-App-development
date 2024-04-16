import { Component, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { IonTabs } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import videojs from "video.js";
declare var cordova: any;

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  selected: string = "news";
  isPlaying: boolean = false;
  isVideoPlaying: boolean = false;
  radioLogo: string = "";
  radioStation: string = "";
  isLargeFont: boolean = false;
  @ViewChild("AntFrame") iframe: ElementRef;
  @ViewChild("tabs") tabRef: IonTabs;
  @ViewChild("MobileAds") adcontainer: ElementRef;

  @ViewChild("videos") videos: ElementRef;
  @ViewChild("radio") radio: ElementRef;
  @ViewChild("news") news: ElementRef;

  @ViewChild("YoutubeVideos") youtubeIframe: ElementRef;

  constructor(
    private render: Renderer2,
    private storage: Storage,
    private screenorientation: ScreenOrientation
  ) {
    // storage.get("settings").then(val => {
    //   if (val == null) return;
    //   const json = JSON.parse(val);
    //   this.isLargeFont = json.text;
    //   var root = document.getElementsByTagName("html")[0];
    //   if(this.isLargeFont == true){
    //     root.className = root.className + " large-font";
    //   }
    //   else{
    //     root.className = root.className.replace( new RegExp("(?:^|\\s)" + "large-font" + "(?:\\s|$)")," ");
    //   }
    // });
  }

  requestCameraPermission() {
    const permissions = cordova.plugins.permissions;

    permissions.requestPermission(
      permissions.CAMERA,
      (status) => {
        if (!status.hasPermission) {
          window.alert("Camera permission denied");
        } else {
          window.alert("Camera permission granted");
          // Now you can use the camera
        }
      },
      () => {
        window.alert("Camera permission request failed");
      }
    );
  }
  getCurrentScreenOrientation() {
    console.log(this.screenorientation.type);
  }

  async UnlockScreenTilt() {
    try {
      this.screenorientation.lock(this.screenorientation.ORIENTATIONS.PORTRAIT);
    } catch (error) {
      console.log(error);
    }
    {
    }
  }

  LockScreenTilt() {
    this.screenorientation.unlock();
  }

  observeScreenOrientation() {
    this.screenorientation
      .onChange()
      .subscribe(() => console.log("Orientation Changed"));
  }
  initAds() {
    this.adcontainer.nativeElement.src = "about:blank";

    setTimeout(() => {
      this.adcontainer.nativeElement.innerhtml =
        "<script>window.googletag = window.googletag || {cmd: []}; googletag.cmd.push(function() {" +
        'googletag.defineSlot("/267159116/Sabcnews.com", [320, 50], "div-gpt-ad-1566313527458-0").addService(googletag.pubads());' +
        "googletag.pubads().enableSingleRequest();googletag.enableServices(); }); </script>";
      // let doc =
      //   this.adcontainer.nativeElement.contentDocument ||
      //   this.adcontainer.nativeElement.contentWindow;

      // doc.open();
      // doc.write(
      //   "<script>window.googletag = window.googletag || {cmd: []}; googletag.cmd.push(function() {" +
      //     'googletag.defineSlot("/267159116/Sabcnews.com", [320, 50], "div-gpt-ad-1566313527458-0").addService(googletag.pubads());' +
      //     "googletag.pubads().enableSingleRequest();googletag.enableServices(); }); </script>"

      //   // '<div id="div-gpt-ad-1566313527458-0" style="width: 320px; height: 50px;">' +
      //   // '<script>googletag.cmd.push(function() { googletag.display("div-gpt-ad-1566313527458-0"); });' +
      //   // "</script></div>"
      // );
      // doc.close();
    }, 200);
  }

  play(radio) {
    this.iframe.nativeElement.src = "about:blank";

    setTimeout(() => {
      this.isPlaying = true;
      this.radioStation = radio.name;
      this.radioLogo = radio.logo;

      let doc =
        this.iframe.nativeElement.contentDocument ||
        this.iframe.nativeElement.contentWindow;

      doc.open();
      doc.innerHTML = "";
      doc.write(
        "<!doctype html><html><body>" +
          "<center>" +
          '<iframe src="' +
          radio.adaptiveUrl.replace("aac", "m3u8") +
          '" ' +
          'scrolling="no" style="width:75%; " onload="resizeIframe(this)" frameborder="0">' +
          "No iframes</iframe>" +
          "</iframe></center>" +
          "</body></html>" +
          "); "
      );
      doc.close();
    }, 200);
  }

  pause() {
    this.iframe.nativeElement.src = "about:blank";
    this.isPlaying = false;
    this.isVideoPlaying = false;
  }

  closeRadioTab() {
    this.iframe.nativeElement.src = "about:blank";
    this.isPlaying = false;
    this.isVideoPlaying = false;
    document.getElementsByClassName("isDark")["style"].display = "none";
  }

  ionicChanged() {
    this.selected = this.tabRef.getSelected();
  }

  playVideo(id) {
    this.iframe.nativeElement.src = "about:blank";

    setTimeout(() => {
      this.isPlaying = true;
      this.isVideoPlaying = true;
      this.radioStation = "";
      this.radioLogo = "sabc-logo.svg";

      let doc =
        this.iframe.nativeElement.contentDocument ||
        this.iframe.nativeElement.contentWindow;

      var url =
        "https://www.youtube.com/embed/" +
        id +
        "?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=1";
      doc.open();
      doc.innerHTML = "";
      doc.write(
        "<!doctype html><html><body>" +
          "<center>" +
          '<iframe src="' +
          url +
          '" ' +
          'scrolling="no" style="width:100%; height: 100%;" ' +
          'rel="0" frameborder="0" ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
          " allowfullscreen>" +
          "No iframes</iframe>" +
          "</iframe></center>" +
          "</body></html>" +
          "); "
      );
      doc.close();
    }, 200);
  }

  ok() {
    videojs("player").pause();
    videojs("playerLehae").pause();
  }
}
