import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Platform, NavController, LoadingController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { AppAvailability } from "@awesome-cordova-plugins/app-availability/ngx";
import {
  InAppBrowser,
  InAppBrowserOptions,
  InAppBrowserObject,
  InAppBrowserEvent,
} from "@ionic-native/in-app-browser/ngx";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";
import { TextToSpeechService } from "../services/text-to-speech.service";
declare var cordova: any;

@Component({
  selector: "app-newsdetail",
  templateUrl: "newsdetail.page.html",
  styleUrls: ["newsdetail.page.scss"],
})
export class NewsDetailPage implements OnInit {
  article: any;
  private articleId;
  bookmarked: boolean = false;
  bookmarkdata: any;
  sharedMessage: string = null;
  sharedImage: string = null;
  sharedLink: string = null;
  localdata: any = [];
  showLoadBtn = false;
  textToRead = "";
  public voices: Array<any> = [];
  public selcetdVoice!: string;

  @ViewChild("dynamic") dynamic: ElementRef;
  @ViewChild("NewsAd2") newsad_2: ElementRef;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private dialogs: Dialogs,
    private route: ActivatedRoute,
    private plt: Platform,
    public http: HttpClient,
    public sanitizer: DomSanitizer,
    private socialSharing: SocialSharing,
    private appAvailability: AppAvailability,
    public loadingController: LoadingController,
    private iab: InAppBrowser,
    private textToSpeech: TextToSpeech,
    private textToSpeechNew: TextToSpeechService
  ) {
    this.articleId = this.route.snapshot.paramMap.get("id");
    this.localdata = localStorage.getItem("bookmarked Articles");
    if (this.localdata != null && this.localdata.length != 0) {
      var cachedArticles: Array<any> = JSON.parse(this.localdata);
      var cachedarticle = cachedArticles.filter((s) => s.id == this.articleId);
      if (cachedarticle.length > 0) {
        this.article = cachedarticle[0];
        this.getData();
        this.bookmarked = false;
      } else {
        this.getArticledata();
      }
    } else {
      this.getArticledata();
    }
  }
  ngOnInit(): void {
    // this.textToSpeechNew.init();
    // this.voices = this.textToSpeechNew.generateVoices();
  }
  ionViewDidEnter() {
    this.platform.backButton.subscribe(() => {
      localStorage.setItem("read", "stopping");
      const obj = new TextToSpeech();
      obj.stop();
      this.navCtrl.pop();
    });

    // this.newsAd_2();
  }

  public init(): void {
    // this.textToSpeechNew.init();
    // this.voices = this.textToSpeechNew.generateVoices();
  }

  public play(): void {
    this.textToSpeechNew.speak(this.textToRead, this.voices[2], 1, 1, 1);
    document.getElementById("start-read").style.display = "none";
    document.getElementById("stop-read").style.display = "block";
  }

  readTextOnScreen() {
    const txt = this.article.content.rendered.replace(/(<([^>]+)>)/gi, "");
    const i = txt.replaceAll("&#8217;", "'");
    this.textToRead = i.replaceAll("&lt;", "");

    document.addEventListener("deviceready", () => {
      this.textToSpeech
        .speak(this.textToRead)
        .then(() => {
          console.log;
        })
        .catch((r) => {
          console.log(r);
        });
    });

    localStorage.setItem("read", "reading");
    console.log(localStorage.getItem("read"));
    document.getElementById("start-read").style.display = "none";
    document.getElementById("stop-read").style.display = "block";
  }

  stopReading() {
    document.addEventListener("deviceready", () => {
      this.textToSpeech.stop();
    });
    document.getElementById("start-read").style.display = "block";
    document.getElementById("stop-read").style.display = "none";

    localStorage.setItem("read", "stopping");
    console.log(localStorage.getItem("read"));
  }
  async newsAd_2() {
    this.newsad_2.nativeElement.innerHTML =
      '<iframe scrolling="no" id="news-banner2" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById("news-banner2") as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      "<!doctype html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        '<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>' +
        "</head>" +
        "<body>" +
        "<div id='newsad-2'>" +
        "<script>" +
        "window.googletag = window.googletag || {cmd: []};" +
        "googletag.cmd.push(function() {" +
        "googletag.defineSlot('/267159116/SABCDigitalNewsMobileLeaderboard3', [[320,50]], 'newsad-2').addService(googletag.pubads());" +
        "googletag.pubads().enableSingleRequest();" +
        "googletag.pubads().collapseEmptyDivs();" +
        "googletag.enableServices();" +
        "googletag.display('newsad-2');" +
        " });" +
        "</script>" +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }

  async getArticledata() {
    const loading = await this.loadingController.create({
      message: "Please wait..",
      spinner: "circles",
    });
    loading.present();

    this.http
      .get(
        `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts/${this.articleId}?&_embed`
      )
      .subscribe(
        (articleData) => {
          this.article = articleData;
          this.getData();
          loading.dismiss().finally(() => {
            this.showLoadBtn = true;
            if (this.showLoadBtn) {
              document.getElementById("start-read").style.display =
                "block !important";
            }
          });
        },
        (e) => {
          console.log(e);
          loading.dismiss();
        }
      );

    this.bookmarked = true;
  }
  bookmarkArticle() {
    this.localdata = localStorage.getItem("bookmarked Articles");
    if (this.localdata == null || this.localdata == undefined) {
      localStorage.setItem(
        "bookmarked Articles",
        JSON.stringify([this.article])
      );
    } else {
      var localStorageCache: Array<any> = JSON.parse(this.localdata);
      var duplicate = localStorageCache.filter((s) => s.id == this.article.id);
      if (duplicate == null || duplicate.length == 0) {
        localStorageCache.push(this.article);
        localStorage.setItem(
          "bookmarked Articles",
          JSON.stringify(localStorageCache)
        );
        this.bookmarked = false;
      }
    }
  }
  removeBookmark() {
    this.localdata = localStorage.getItem("bookmarked Articles");
    var localStorageCache: Array<any> = JSON.parse(this.localdata);
    var bookmarkArticles = localStorageCache.filter(
      (s) => s.id != this.article.id
    );
    localStorage.setItem(
      "bookmarked Articles",
      JSON.stringify(bookmarkArticles)
    );
    this.bookmarked = true;
  }

  openChannelVideo(id) {
    // if (this.plt.is("cordova")) {
    //  this.youtube.openVideo(id);
    // } else {
    //   cordova.InAppBrowser.open("https://www.youtube.com/watch?v=" + id);
    // }

    const options: InAppBrowserOptions = {
      location: "yes",
      hidden: "no",
      clearcache: "yes",
      clearsessioncache: "yes",
      zoom: "yes",
      hardwareback: "yes",
      mediaPlaybackRequiresUserAction: "no",
      shouldPauseOnSuspend: "no",
      closebuttoncaption: "Close",
      disallowoverscroll: "no",
      toolbar: "yes",
      enableViewportScale: "no",
      allowInlineMediaPlayback: "no",
      presentationstyle: "pagesheet",
      fullscreen: "yes",
      footer: "yes",
    };

    const browser: InAppBrowserObject = this.iab.create(
      "https://www.youtube.com/watch?v=" + id,
      "_blank",
      options
    );
    browser.show();
    // cordova.InAppBrowser.open("https://www.youtube.com/watch?v=" + id, '_blank', 'location=no', 'hardwareback=no');
  }

  shareSheetShare() {
    this.socialSharing
      .share(
        "SABC News",
        this.article.title.rendered,
        this.article?._embedded["wp:featuredmedia"]["0"]?.source_url,
        this.article.link
      )
      .then(() => {
        console.log("shareSheetShare: Success");
      })
      .catch(() => {
        console.error("shareSheetShare: failed");
      });
  }
  smsShare() {
    this.socialSharing
      .shareViaSMS(this.sharedLink, "")
      .then(() => {
        console.log("shareViaSMS: Success");
      })
      .catch(() => {
        this.showErrorAlert("SMS");
      });
  }
  whatsappShare() {
    this.socialSharing
      .shareViaWhatsApp(this.sharedMessage, null, this.sharedLink)
      .then(() => {
        console.log("shareViaWhatsapp: Success");
      })
      .catch(() => {
        this.showErrorAlert("Whatsapp");
      });
  }
  twitterShare() {
    this.socialSharing
      .shareViaTwitter(null, this.sharedImage, this.sharedLink)
      .then(() => {
        console.log("sharetwitter: Success");
      })
      .catch(() => {
        this.showErrorAlert("Twitter");
        window.open(
          `https://twitter.com/share?url="${this.sharedLink}`,
          "_system"
        );
      });
  }
  facebookShare() {
    this.socialSharing
      .shareViaFacebook(this.sharedMessage, null, this.sharedLink)
      .then(() => {
        console.log("shareViaFacebook: Success");
      })
      .catch(() => {
        console.log("failed");
        this.showErrorAlert("Facebook");
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${this.sharedLink}`,
          "_system"
        );
      });
  }

  allShare() {
    this.socialSharing
      .share(
        "SABC News",
        this.article.title.rendered,
        this.article?._embedded["wp:featuredmedia"]["0"]?.source_url,
        this.article.link
      )
      .then(() => {
        console.log("shareSheetShare: Success");
      })
      .catch(() => {
        console.error("shareSheetShare: failed");
      });
  }

  instagramShare() {
    this.socialSharing
      .shareViaInstagram(this.sharedMessage, this.sharedLink)
      .then(() => {
        console.log("shareViaInstagram: Success");
      })
      .catch(() => {
        console.log("failed");
        this.showErrorAlert("Instagram");
      });
  }

  telegramShare() {
    this.socialSharing
      .shareVia(this.sharedMessage, null, this.sharedLink)
      .then(() => {
        console.log("Telegram: Success");
      })
      .catch(() => {
        console.log("failed");
        this.showErrorAlert("Telegram");
      });
  }
  emailShare() {
    this.socialSharing
      .canShareViaEmail()
      .then((res) => {
        this.socialSharing
          .shareViaEmail(
            this.sharedMessage,
            "SABC News",
            null,
            null,
            null,
            this.sharedLink
          )
          .then(() => {
            console.log("canShareViaEmail: Success");
          });
      })
      .catch((e) => {
        console.log("failed");
        this.showErrorAlert("Email");
      });
  }

  messangerShare() {
    this.socialSharing
      .shareViaFacebook(this.sharedMessage, null, this.sharedLink)
      .then(() => {
        console.log("shareViaFacebook: Success");
      })
      .catch(() => {
        this.showErrorAlert("Facebook Messanger");
      });
  }

  getData() {
    setTimeout(() => {
      let text = this.article.content.rendered;
      this.sharedLink = this.article.link;
      this.sharedMessage = this.article.title.rendered;
      this.sharedImage =
        this.article?._embedded["wp:featuredmedia"]["0"]?.source_url;

      let el = this.dynamic.nativeElement as HTMLElement;
      el.innerHTML = text;

      let arrayOfLinks = el.querySelectorAll("a");
      for (let i = 0; i < arrayOfLinks.length; i++) {
        let anchor = arrayOfLinks[i];
        anchor.onclick = function (ev) {
          window.open(anchor.href, "_system");
          ev.preventDefault();
          return false;
        };
      }

      let arrayOfIframes = el.querySelectorAll("iframe");
      for (let i = 0; i < arrayOfIframes.length; i++) {
        let iframe = arrayOfIframes[i];
        if (iframe.src.indexOf("youtube") > -1) {
          let id = iframe.src.substring(iframe.src.lastIndexOf("/") + 1);
          if (id.indexOf("?") > -1) {
            id = id.substring(0, id.indexOf("?"));
          }
          const image = document.createElement("img") as HTMLImageElement;
          //console.log(id);
          image.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
          image.style.width = "100%";
          image.style.height = "auto";

          image.onclick = () => this.openChannelVideo(id);
          iframe.parentElement.replaceChild(image, iframe);
          image.parentElement.className = "youtube";
          image.parentElement.onclick = () => this.openChannelVideo(id);
        }
      }
    }, 500);
  }

  showErrorAlert(platform: string) {
    if (this.plt.is("cordova")) {
      this.dialogs.alert(
        platform + " is not currently available on your device.",
        "Sharing not available",
        "Ok"
      );
    } else {
      alert(platform + " is not currently available on your device.");
    }
  }
}
