import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  OnInit,
} from "@angular/core";
import {
  NavController,
  IonList,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { IonInfiniteScroll, IonContent } from "@ionic/angular";
// import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { UpdateService } from "../services/update.service";
import { AdmobFreeService } from "../services/admobfree.service";
import { Storage } from "@ionic/storage";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";
import { ReaderStopModalPage } from "../modals/reader/reader-stop-modal/reader-stop-modal.page";
import { DomSanitizer } from "@angular/platform-browser";
declare var cordova: any;

@Component({
  selector: "app-news",
  templateUrl: "news.page.html",
  styleUrls: ["news.page.scss"],
})
export class NewsPage implements OnInit {
  data: any;
  olderData: any;
  rawData: any;
  selectedRegion: any;
  currentPage: number = 1;
  selectedCategory: any = [];
  currentCategory: string = null;
  businessCategory: boolean = false;
  elections: boolean = false;
  searchWord = "";
  showSearch: boolean = false;
  searchResults: boolean = true;
  catid: string = null;
  subCatId: string = null;
  private url;
  private categoryUrl;
  isReading = false;
  private liveStrealURL;
  testString = "";
  showBanner = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild("currencyIframe") container: ElementRef;
  @ViewChild("BannerAd") adcontainer: ElementRef;
  @ViewChild("NewsAd1") newsad_1: ElementRef;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    // private geolocation: Geolocation
    private updateService: UpdateService,
    private admobFreeService: AdmobFreeService,
    private storage: Storage,
    private mdlCtrl: ModalController,
    private domSanitizer: DomSanitizer
  ) {
    let searchIcon = this.elementRef.nativeElement.querySelector(
      ".searchbar-search-icon"
    );

    if (searchIcon != null) {
      this.renderer.listen(searchIcon, "click", (event) => {});
    }

    setTimeout(() => {
      this.requestCameraPermission();
    }, 5000);
  }
  ngOnInit(): void {
    localStorage.removeItem("read");
  }

  stp() {
    const txt = new TextToSpeech();
    txt.stop();
    localStorage.setItem("read", "stopping");
    console.log(localStorage.getItem("read"));
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

  ionViewDidEnter() {
    this.currencyIframe();
    this.catid = this.activatedRoute.snapshot.paramMap.get("catid");
    if (this.catid != "") {
      console.log("catid" + this.catid);
      this.subCatId = null;
      this.filterArticles(this.catid);
    } else {
      this.getData();
    }
    
    this.updateService.chackForUpdate();

    // this.showNativeAd();
    // this.newsAd_1();
  }
  async showNativeAd() {
    // this.admobFreeService.init();
    // await this.admobFreeService.showNativeAd();
  }

  async showStopReader() {
    const mdl = await this.mdlCtrl.create({
      component: ReaderStopModalPage,
    });

    return await mdl.present();
  }

  async newsAd_1() {
    this.newsad_1.nativeElement.innerHTML =
      '<iframe scrolling="no" id="news-banner1" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById("news-banner1") as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      "<!doctype html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8">' +
        '<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>' +
        "</head>" +
        "<body>" +
        "<div id='newsad-1'>" +
        "<script>" +
        "window.googletag = window.googletag || {cmd: []};" +
        "googletag.cmd.push(function() {" +
        "    googletag.defineSlot('/267159116/SABCDigitalNewsMobileLeaderboard2', [[320,50]], 'newsad-1').addService(googletag.pubads());" +
        "googletag.pubads().enableSingleRequest();" +
        "googletag.pubads().collapseEmptyDivs();" +
        "googletag.enableServices();" +
        "googletag.display('newsad-1');" +
        " });" +
        "</script>" +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }

  currencyIframe() {
    this.container.nativeElement.innerHTML =
      '<iframe style="min-height: 200px; width: 100%;" scrolling="no" id="Currency" allowfullscreen="yes"></iframe>';

    const iframe = document.getElementById("Currency") as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      '<!doctype html><html><body><div class="financial_content">' +
        '<!-Foreign Exchange Rates widget - HTML code - fx-rate.net --><div style="align:center;text-align;left;margin:0px 0px;padding:0px 0px;"> ' +
        '<div style="text-align:center;font-size:12px; line-height:16px;font-family: arial;color:#173a00; font-weight:bold;background:#c5e554;padding:3px 3px;"> ' +
        '<a href="http://fx-rate.net/ZAR/" title="South African Rand Exchange Rate"  style="text-decoration:none;color:#173a00;font-size:12px; line-height:16px;font-family: arial;">' +
        '<img border="" width="16" height="11" style="margin:0;padding:0;border:0;" src="http://fx-rate.net/images/countries/za.png"/>' +
        "</img> &#160;&#160; South African Rand Exchange Rate</a> " +
        '</div><script type="text/javascript" src="http://fx-rate.net/fx-rates.php?label_type=country_name&currency=ZAR&length=short"></script></div></div>' +
        "</body></html>"
    );
  }

  showElections(e: boolean) {
    this.elections = e;
    if (e == false) {
      this.data == false;
      this.currentCategory = null;
      this.getData();
    }
  }

  commitData(data) {
    localStorage.setItem("news", null);
    localStorage.setItem("news", JSON.stringify(data));

    console.log("data set to storage" + JSON.stringify(data));
    return data;
  }

  loadData(event) {
    this.url = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&_embed&page=${++this
      .currentPage}${
      this.currentCategory != null ? "&categories=" + this.currentCategory : ""
    }`;
    this.http.get(this.url).subscribe(
      (data) => {
        console.log("data laoded" + data);
        this.data = this.data.concat(data);
        event.target.complete();
      },
      (e) => {
        event.target.complete();
        console.log(e);
      }
    );
  }

  getCachedData() {
    console.log("data cacged" + localStorage.getItem("news"));
    return JSON.parse(localStorage.getItem("news"));
  }

  getCachedCategoryData(category) {
    this.storage.get("category" + category).then((val) => {
      console.log("category cachesd");
      console.log(JSON.parse(val));
      this.data = JSON.parse(val);
    });
  }

  async getData(page: number = 1) {
    this.selectedRegion = localStorage.getItem("region");
    if (this.selectedRegion != null && this.selectedRegion.length > 0) {
      this.url = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?tags=${this.selectedRegion}&_embed`;
    } else {
      this.url = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&page=1&_embed`;
    }

    this.http.get(this.url).subscribe(
      (data) => {
        this.data = this.commitData(data);
      },
      (e) => {
        console.log(e);
        if (localStorage.getItem("news") !== null) {
          this.data = this.getCachedData();
        }
      }
    );

    this.data = this.getCachedData();
  }
  async filterArticles(category) {
    this.showBanner = false;
    this.subCatId = null;
    this.selectedRegion = localStorage.getItem("region");
    if (this.selectedRegion != null && this.selectedRegion.length > 0) {
      this.categoryUrl = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?tags=${this.selectedRegion}&per_page=20&categories=${category}&_embed`;
    } else {
      this.categoryUrl = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&categories=${category}&_embed`;
    }
    this.currentCategory = category;
    this.currentPage = 1;

    this.content.scrollToTop();

    if (category === null || category === "null") {
      this.getData();
    } else {
      var catData = await this.storage.get("category" + category);
      const loading = await this.loadingController.create({
        message: "Please wait..",
        spinner: "circles",
      });

      if (catData === null || catData === "null") {
        loading.present();
      }

      this.currentCategory = category;
      this.http.get(this.categoryUrl).subscribe(
        (rawData) => {
          this.data = rawData;

          if (catData === null || catData === "null") {
            loading.dismiss();
          }

          this.storage.set("category" + category, JSON.stringify(this.data));
        },
        (e) => {
          console.log(e);

          if (catData === null || catData === "null") {
            loading.dismiss();
          }

          this.getCachedCategoryData(category);
        }
      );

      this.getCachedCategoryData(category);
    }

    if (category == 15) {
      this.businessCategory = true;
    } else {
      this.businessCategory = false;
    }
  }


  async filterSubCat(category){
    console.log("category", category);
    if(!category){
      return;
    }
    this.showBanner = true;
    this.selectedRegion = localStorage.getItem("region");
    console.log('this.selectedRegion--->', this.selectedRegion);

    if(category == 'election_result'){
      this.content.scrollToTop();

    } else {
      if (this.selectedRegion != null && this.selectedRegion.length > 0) {
        this.categoryUrl = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?tags=${this.selectedRegion}&per_page=20&categories=${category}&_embed`;
      } else {
        this.categoryUrl = `https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&categories=${category}&_embed`;
      }
      this.currentCategory = category;
      this.currentPage = 1;
  
      this.content.scrollToTop();
  
      if (category === null || category === "null") {
        this.getData();
      } else {
        var catData = await this.storage.get("category" + category);
        const loading = await this.loadingController.create({
          message: "Please wait..",
          spinner: "circles",
        });
  
        if (catData === null || catData === "null") {
          loading.present();
        }
  
        this.currentCategory = category;
        this.http.get(this.categoryUrl).subscribe(
          (rawData) => {
            this.data = rawData;
            console.log('this.data', this.data);
  
            if (catData === null || catData === "null") {
              loading.dismiss();
            }
  
            this.storage.set("category" + category, JSON.stringify(this.data));
          },
          (e) => {
            console.log(e);
  
            if (catData === null || catData === "null") {
              loading.dismiss();
            }
  
            this.getCachedCategoryData(category);
          }
        );
  
        this.getCachedCategoryData(category);
      }
  
      if (category == 15) {
        this.businessCategory = true;
      } else {
        this.businessCategory = false;
      }
    }
    
  }

  showMoreResults() {
    this.getData(++this.currentPage);
  }

  oj() {
    this.http
      .post("http://another-one.local/wp-json/techiepress/v1", {})
      .subscribe(
        (data) => {
          console.log(data);
        },
        (erro) => {
          alert("Error" + erro);
        }
      );
  }
}
