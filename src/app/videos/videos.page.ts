import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { Observable } from "rxjs";
import {
  NavController,
  Platform,
  ModalController,
  IonRouterOutlet,
  NavParams,
} from "@ionic/angular";
import { YtProvider } from "../provider/youtube/yt";
import { TabsPage } from "../tabs/tabs.page";
import { Storage } from "@ionic/storage";
import { playListCollection } from "../classes/playListCollection";
import { HttpClient } from "@angular/common/http";
import { Insomnia } from "@ionic-native/insomnia/ngx";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { AppAvailability } from "@awesome-cordova-plugins/app-availability/ngx";
import { IonModal } from "@ionic/angular";
import { YtPrivayPolicyComponent } from "../modals/yt-privay-policy/yt-privay-policy.component";
import { AppComponent } from "../app.component";
import videojs from "video.js";
import { UidService } from "../services/uid-service/uid.service";
// import "videojs-contrib-quality-levels";
// import qualitySelectorHls from "videojs-quality-selector-hls";
//import Plyr from "node_modules/plyr";
// import _ from "videojs-contrib-quality-levels";
// import hlsQualitySelector from "videojs-hls-quality-selector";
declare var cordova: any;
declare var require: any;
//declare var Plyr: any;

@Component({
  selector: "app-videos",
  templateUrl: "videos.page.html",
  styleUrls: ["videos.page.scss"],
})
export class VideosPage implements OnInit, AfterViewInit {
  @ViewChild("AntFrame") iframe: ElementRef;
  @ViewChild("iframeContainer") container: ElementRef;
  @ViewChild("YoutubeVideos") youtubeIframe: ElementRef;
  @ViewChild("news-stream") liveStream: ElementRef;
  @ViewChild("lehae-stream") lehaeStream: ElementRef;
  @ViewChild("WatchAd1")
  watchad_1: ElementRef;
  @ViewChild("WatchAd2") watchad_2: ElementRef;

  channel = "UC8yH-uI81UUtEMDsowQyx1g";

  videoCollection1: Array<playListCollection> = [
    new playListCollection(
      "PLyxkBFYMs1vxisOX37VrAzpMfYpcdHFRr",
      "TRENDZ",
      true
    ),
    new playListCollection("PLyxkBFYMs1vzZVA5apokHykY8PQkUz8Vp", "NETWORK"),
    new playListCollection(
      "PLyxkBFYMs1vwoAjBhH4EmZaTLuhX6KOTI",
      "SME #OnPoint"
    ),
    new playListCollection("PLyxkBFYMs1vwmLHTZLJCLsqd2X0sbsjJZ", "UNFILTERED"),
    new playListCollection(
      "PLyxkBFYMs1vzJ-QK3Pi0RutZ25IPvaBYt",
      "ZWA MARAMANI "
    ),
    new playListCollection(
      "PLyxkBFYMs1vyCYdqGe9OFkWXJtRfHe4zg",
      "YILUNGELO LAKHO"
    ),
    new playListCollection(
      "PLyxkBFYMs1vwF2XJ92t7JGLhLaF5nxh7w",
      "LEIHLO LA SECHABA"
    ),
    new playListCollection("PLyxkBFYMs1vwzE6igkIhAzu_sSFltpjoY", "EXPRESSIONS"),
    new playListCollection(
      "PLyxkBFYMs1vxzBp5WCB3DW0Rwfx-Coocp",
      "IT'S TOPICAL"
    ),
    new playListCollection(
      "PLyxkBFYMs1vx9C_ousl6dWStsl_YapCLq",
      "CUTTING EDGE"
    ),
    // new playListCollection(
    //   "PLyxkBFYMs1vxmOux7Bs6LS1P9LO574zom",
    //   "SERVICE DELIVERY GAUGE"
    // ),
    new playListCollection("PLyxkBFYMs1vwg7iya4qQfdRPgUQWxeyiT", "FOKUS"),
    // new playListCollection(
    //   "PLyxkBFYMs1vwUbZeXvEAcCSDak8SKqnFx",
    //   "MEDIA MONITOR"
    // ),
    new playListCollection(
      "PLyxkBFYMs1vx5ze4nmbyPUZAM1a2wbYgh",
      "NGULA YA VUTIVI"
    ),
    // new playListCollection(
    //   "PLyxkBFYMs1vztoH4L2H2Lpt4jZR2D0_MS",
    //   "SPECIAL ASSIGNMENT"
    // ),
  ];

  videoCollection2: Array<playListCollection> = [
    new playListCollection("UULFSO8qij295DSxMiofTLk9QQ", "SABC Izindaba", true),
    new playListCollection("UULFl8gMaUWyG6v9gxpq6iWbmA", "SABC lindaba"),
    new playListCollection("UULFPde3flccFt8JwCQwmOCWsg", "SABC Nuus"),
    new playListCollection("UULFfJ6oO7RhiemsjzDuakMJKQ", "SABC Ditaba_Dikgang"),
    new playListCollection("UULFnd5IeDRc7BGWZBjMCOVodg", "SABC Tindzaba"),
    new playListCollection(
      "UULFIGMWfh16Q6UQIJR1iDhQNw",
      "SABC lindaba zesiNdebele"
    ),
    new playListCollection("UULF3liuiQ-WmUe1vAEOQxErZQ", "SABC Mafhungo"),
    new playListCollection("UULF5fWoGVzmD7p1PFeatPPvyw", "SABC Mahungu"),
  ];

  videoCollectionElections: Array<playListCollection> = [  
    // new playListCollection("PL6nlC_4xlW1d5FFHDUlFyUmCETutUto8Y", "SABC lindaba", true), // Just comment for now
    new playListCollection("PLyxkBFYMs1vwqTic2sZ117jA9TM1ifha3", "SABC lindaba", true), // This is dummy
    new playListCollection("PLheNMFGA5XUbX1YkND2nL2gnXozTUmgOq", "SABC Nuus"),
    new playListCollection("PLizFksc4_qTdN-d4EmmHZarMpd0xtMDzr", "SABC Tindzaba"),
    new playListCollection("PL_ZZEKwKV-jEWooW1s4KDAvtc0gwL2Lah", "SABC Mafhungo"),
    new playListCollection("PLZy23hodYfjh27L7Bj3olq0yJALJppi7X", "SABC lindaba zesiNdebele"),
    new playListCollection("PLc6ehAmReWzXdnwcHgowJuEqQAHGo4LPS", "SABC Ditaba_Dikgang"),
    new playListCollection("PLizFksc4_qTeLxF9qsTpAiWMgFCYR8_Kx", "SABC Izindaba"),
    new playListCollection("PLzKOV6-RhVwqqeKe-f3gpjJv3HHNmEtOj", "SABC Mahungu"),
  ];

  videoCollectionNews: Array<playListCollection> = [
    new playListCollection("PLyxkBFYMs1vwnC8EdSjAPWrLeKy4Sx1gO", "News", true),
  ];

  youTubePlayList1: Observable<any[]>;
  youTubePlayList2: Observable<any[]>;
  youTubePlayListElections: Observable<any[]>;
  youTubePlayListNews: Observable<any[]>;
  onAir: boolean = true;
  onCatchUp: boolean = false;
  onAfrican: boolean = false;

  apiResults: any;
  highBandwidth: boolean = true;
  isModalOpen = false;
  isAccepted = false;
  liveStreamURL = "";
  liveFrame: any;
  lehaeFrame: any;
  player: any;
  playerLehae: any;
  qualityLevels: any;
  vidjs = window["videojs"];
  //plyPlyer: Plyr;

  //Streaming Analytics UniversalVariables
  newsCannelID: number = 324;
  lehaeChannelID: number = 326;
  userID: number = 194; //For SABC Streams
  app_id: number = 40;
  deviceiOS: number = 4;
  deviceAndroid: number = 3;
  newsSessionID: string = "";
  lehaeSessionID: string = "";

  segmentVal = "news";
  playlistElectionModel: any = 'PLyxkBFYMs1vwqTic2sZ117jA9TM1ifha3';

  constructor(
    public navCtrl: NavController,
    private ytProvider: YtProvider,
    private platform: Platform,
    private tabs: TabsPage,
    private http: HttpClient,
    private insomnia: Insomnia,
    private screenOrientation: ScreenOrientation,
    private storage: Storage,
    private appAvailability: AppAvailability,
    public routerOutlet: IonRouterOutlet,
    public modalController: ModalController,
    private uidGenerator: UidService
  ) {
    if (this.isAccepted === false) {
      this.ytPrivacyPolicy();
    }
    this.videoCollection1.forEach((item) => {
      this.ytProvider.getListVideos(item.playlistId).subscribe((data) => {
        item.videos = data.filter((s) => s.snippet.thumbnails != null);
        if (item.selected) {
          this.youTubePlayList1 = item.videos;
        }
      });
    });

    this.videoCollection2.forEach((item) => {
      this.ytProvider.getListVideos(item.playlistId).subscribe((data) => {
        item.videos = data.filter((s) => s.snippet.thumbnails != null);
        if (item.selected) {
          this.youTubePlayList2 = item.videos;
        }
      });
    });


    // Elections Playlist
    this.videoCollectionElections.forEach((item) => {
      this.ytProvider.getListVideos(item.playlistId).subscribe((data) => {
        item.videos = data.filter((s) => s.snippet.thumbnails != null);
        if (item.selected) {
          this.youTubePlayListElections = item.videos;
          console.log('election playlist', this.youTubePlayListElections);
        }
      });
    });

    // News Playlist
    this.videoCollectionNews.forEach((item) => {
      this.ytProvider.getListVideos(item.playlistId).subscribe((data) => {
        item.videos = data.filter((s) => s.snippet.thumbnails != null);
        if (item.selected) {
          this.youTubePlayListNews = item.videos;
          console.log("news playliusts", this.youTubePlayListNews);
        }
      });
    });

    storage.get("settings").then((val) => {
      const json = JSON.parse(val);
      if (json?.highQuality == true) {
        this.highBandwidth = true;
      } else {
        this.highBandwidth = false;
      }
    });

    var key = "AIzaSyCYGhUTOcaEQdhVKjxGwAtHZYsirGe0cp4";
    if (this.platform.is("ios")) {
      key = "AIzaSyA4-7ccn3x7CvnqojtR-GT338QCKlN8TBE";
    } else {
      key = "AIzaSyBkZBnEUba955IsZMu4zx96J6O1EmhB_CQ";
    }

    this.http
      .get(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UU8yH-uI81UUtEMDsowQyx1g&key=" +
          key
      )
      .subscribe(
        (data) => {
          this.apiResults = data["items"];
        },
        (e) => {
          console.log("error", JSON.stringify(e));
        }
      );

    // this.tabs.pause();

    this.insomnia.keepAwake().then(
      () => console.log("success"),
      () => console.log("error")
    );
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    var intervalNews;
    var intervalLehae;
    //this.oj();
    //videojs.registerPlugin("qualitySelectorHls", qualitySelectorHls);
    document.addEventListener("deviceready", () => {
      this.playerLehae = videojs(document.getElementById("playerLehae"), {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        preload: "auto",
        bigPlayButton: true,
        qualitySelector: true,
        userActions: {
          // worked space to play or pause of video
          hotkeys: true,
        }, // speed of movie
        // // // // controlBar: {
        // // // //   pictureInPictureToggle: true,
        // // // // },

        enableDocumentPictureInPicture: true,
        liveui: true,
      });

      this.player = videojs(document.getElementById("player"), {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        preload: "auto",
        bigPlayButton: true,
        qualitySelector: true,
        userActions: {
          // worked space to play or pause of video
          hotkeys: true,
        }, // speed of movie
        // // // // controlBar: {
        // // // //   pictureInPictureToggle: true,
        // // // // },

        enableDocumentPictureInPicture: true,
        liveui: true,
      });

      //Streaming Analytics code

      this.player.on("play", () => {
        this.newsSessionID = this.uidGenerator.generateUniqueID(); // New Session ID whenever user starts to play the live stream

        if (this.platform.is("ios")) {
          let newsStreamURL = this.setSession(
            this.userID,
            this.newsCannelID,
            this.newsSessionID,
            "",
            this.deviceiOS,
            this.app_id
          );
          this.sendSessioAnalytics(newsStreamURL);
          //alert("News fired from ios");
          intervalNews = setInterval(() => {
            this.sendSessioAnalytics(newsStreamURL);
            //a//lert("News Still fired from ios");
          }, 90000);
        } else if (this.platform.is("android")) {
          let newsStreamURL = this.setSession(
            this.userID,
            this.newsCannelID,
            this.newsSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(newsStreamURL);
          //alert("News fired from android");
          intervalNews = setInterval(() => {
            this.sendSessioAnalytics(newsStreamURL);
            //alert("News Still fired from android");
          }, 90000);
        }
      });

      this.player.on("pause", () => {
        if (this.platform.is("ios")) {
          let newsStreamURL = this.setSession(
            this.userID,
            this.newsCannelID,
            this.newsSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(newsStreamURL);
          //alert("News: Last fired from ios");

          if (this.newsSessionID.length > 0) {
            clearInterval(intervalNews);
          }
        } else if (this.platform.is("android")) {
          let newsStreamURL = this.setSession(
            this.userID,
            this.newsCannelID,
            this.newsSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(newsStreamURL);
          //alert("News Last fired from android");
          if (this.newsSessionID.length > 0) {
            clearInterval(intervalNews);
          }
        }
      });

      this.playerLehae.on("play", () => {
        this.lehaeSessionID = this.uidGenerator.generateUniqueID(); // New Session ID whenever user starts to play the live stream

        if (this.platform.is("ios")) {
          let lehaeStreamURL = this.setSession(
            this.userID,
            this.lehaeChannelID,
            this.lehaeSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(lehaeStreamURL);
          alert("Lehae fired from ios");
          intervalLehae = setInterval(() => {
            this.sendSessioAnalytics(lehaeStreamURL);
            alert("Lehae Still fired from ios");
          }, 90000);
        } else if (this.platform.is("android")) {
          let lehaeStreamURL = this.setSession(
            this.userID,
            this.lehaeChannelID,
            this.lehaeSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(lehaeStreamURL);
          // alert("Lehae fired from android");
          intervalLehae = setInterval(() => {
            this.sendSessioAnalytics(lehaeStreamURL);
            //alert(" Lehae Still fired from android");
          }, 90000);
        }
      });

      this.playerLehae.on("pause", () => {
        if (this.platform.is("ios")) {
          let lehaeStreamURL = this.setSession(
            this.userID,
            this.lehaeChannelID,
            this.lehaeSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(lehaeStreamURL);
          //alert("Lehae Last fired from ios");

          if (this.lehaeSessionID.length > 0) {
            clearInterval(intervalLehae);
          }
        } else if (this.platform.is("android")) {
          let lehaeStreamURL = this.setSession(
            this.userID,
            this.lehaeChannelID,
            this.lehaeSessionID,
            "",
            this.deviceAndroid,
            this.app_id
          );
          this.sendSessioAnalytics(lehaeStreamURL);
          //     alert("Lehae Last fired from android");
          if (this.lehaeSessionID.length > 0) {
            clearInterval(intervalLehae);
          }
        }
      });

      // End Analytics Code
      this.http
        .get(
          "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes"
        )
        .subscribe(
          (data) => {
            //window.alert("404 loaded");
            this.player.src(data["playbackURL"]);
          },
          (error) => {
            //window.alert("Not Loaded");
          }
        );

      // HLS streams for testing plugin on the browser since the HLS we get from the API is setup to only work on mobile
      // this.player.src(
      //   "https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8"
      // );
      // this.playerLehae.src(
      //   "https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8"
      // );
      this.http
        .get(
          "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=326&need_playback=yes"
        )
        .subscribe(
          (data) => {
            //window.alert("lehae loaded");
            this.playerLehae.src(data["playbackURL"]);
          },
          (error) => {
            //window.alert("Not Loaded");
          }
        );
    });

    //this.player.src("https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8");
    // this.player.src(
    //   "https://sabconetanw.cdn.mangomolo.com/news/smil:news.stream.smil/playlist.m3u8?stime=20240213040814&etime=20240220080954&token=076e721dec0a5ca6be777"
    // );

    // this.player.qualitySelectorHls({
    //   displayCurrentQuality: true,
    //   placementIndex: 2,
    //   vjsIconClass: "vjs-icon-hd",
    // });
    // this.player.hlsQualitySelector({
    //   displayCurrentQuality: true, // Display current quality in the control bar
    //   displayMode: "menu", // Display quality options in a menu
    //   title: "Quality", // Title for the quality selector button
    //   useClassNames: true, // Use class names for quality labels
    // });
    const vid = document.getElementById("player") as HTMLVideoElement;
    const vidLehae = document.getElementById("playerLehae") as HTMLVideoElement;
    vid.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreen) {
        this.screenOrientation.lock("landscape");
      } else {
        this.screenOrientation.lock("portrait");
      }
    });

    ////videojs("").requestPictureInPicture;
    vidLehae.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreen) {
        this.screenOrientation.lock("landscape");
      } else {
        this.screenOrientation.lock("portrait");
      }
    });
    // this.player.qualitySelectorHls({
    //   displayCurrentQuality: true,
    //   placementIndex: 4,
    //   vjsIconClass: "vjs-icon-hd",
    // });
    // this.playerLehae.qualitySelectorHls({
    //   displayCurrentQuality: true,
    //   placementIndex: 4,
    //   vjsIconClass: "vjs-icon-hd",
    // });
    //this.showOnAir(true);

    //this.showOnAir(true);
    // this.http
    //   .get("https://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts/")
    //   .subscribe((data) => {
    //     console.log("1. " + data.toString());
    //   });
    // this.http
    //   .get("http://jhb-webdevelopers-qa/sabcnews/wp-json/wp/v2/posts/")
    //   .subscribe((data) => {
    //     console.log("2. " + data.toString());
    //   });
  }

  async ytPrivacyPolicy() {
    const mdl = await this.modalController.create({
      component: YtPrivayPolicyComponent,
    });
  }
  ionViewDidEnter() {
    document.addEventListener("deviceready", () => {
      this.http
        .get(
          "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes"
        )
        .subscribe(
          (data) => {
            //window.alert("404 Loaded");
            //this.player.src(data["playbackURL"]);
          },
          (error) => {
            //window.alert("Not Loaded");
          }
        );

      this.http
        .get(
          "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=326&need_playback=yes"
        )
        .subscribe(
          (data) => {
            //window.alert("lehae Loaded");
            //this.playerLehae.src(data["playbackURL"]);
          },
          (error) => {
            //window.alert("Not Loaded");
          }
        );
    });
    //this.playLiveStream();
    this.watchAd1();
    // this.http
    //   .get(
    //     "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes"
    //   )
    //   .subscribe((data) => {
    //     this.liveStreamURL = data["playbackURL"];
    //     this.player.src(this.liveStreamURL);
    //   });
    //this.player =
    // this.http
    //   .get(
    //     "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes"
    //   )
    //   .subscribe((data) => {
    //     this.liveStreamURL = data["playbackURL"];
    //   });
    // setTimeout(() => {
    //   this.player.src(this.liveStream);
    // }, 250);
  }
  ionViewWillLeave() {
    //alert("left screen");
    this.container.nativeElement.innerHTML = null;
    this.onAir = true;
    this.onCatchUp = false;
    this.onAfrican = false;

    if (
      this.player.src != undefined ||
      this.player.src != "" ||
      this.player.src != null
    ) {
      this.player.pause();
    }
    if (
      this.playerLehae.src != undefined ||
      this.playerLehae.src != "" ||
      this.playerLehae.src != null
    ) {
      this.playerLehae.pause();
    }
    //this.player.pause();

    // this.openPlayList1(this.videoCollection1[0].playlistId);
    // this.openPlayList2(this.videoCollection2[0].playlistId);
    this.insomnia.allowSleepAgain().then(
      () => console.log("success"),
      () => console.log("error")
    );

    console.log("left");
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //alert("Left");
  }

  openPlayList1(id: string) {
    const playList: playListCollection = this.videoCollection1.filter(
      (s) => s.playlistId === id
    )[0];
    this.videoCollection1.forEach((item) => (item.selected = false));
    playList.selected = true;
    this.youTubePlayList1 = this.videoCollection1.filter(
      (s) => s.selected
    )[0].videos;
  }

  openPlayList2(id: string) {
    const playList: playListCollection = this.videoCollection2.filter(
      (s) => s.playlistId === id
    )[0];
    this.videoCollection2.forEach((item) => (item.selected = false));
    playList.selected = true;
    this.youTubePlayList2 = this.videoCollection2.filter(
      (s) => s.selected
    )[0].videos;
  }

  openPlayListElection(id: string, index: number) {
    console.log('id--->', id);
    const playList: playListCollection = this.videoCollectionElections.filter(
      (s) => s.playlistId === id
    )[0];
    this.videoCollectionElections.forEach((item) => (item.selected = false));
    playList.selected = true;
    this.youTubePlayListElections = this.videoCollectionElections.filter(
      (s) => s.selected
    )[0].videos;

    console.log('this.youTubePlayListElections', this.youTubePlayListElections);
    console.log('playList---->', this.videoCollectionElections);
  }

  openVideo(video, feature: boolean) {
    if (
      this.player.src != undefined ||
      this.player.src != "" ||
      this.player.src != null
    ) {
      this.player.pause();
    }
    if (
      this.playerLehae.src != undefined ||
      this.playerLehae.src != "" ||
      this.playerLehae.src != null
    ) {
      this.playerLehae.pause();
    }
    this.tabs.playVideo(video);
  }

  playLiveStream() {
    document.getElementById("live-button").classList.add("viewing");
    document.getElementById("lehae-button").classList.remove("viewing");
    document.getElementById("news-playlist").style.display = "block";
    document.getElementById("news-playlistsss").style.display = "none";
    this.container.nativeElement.innerHTML =
      "<div style='position:relative;padding-bottom:56.25%;height:0;overflow:hidden; margin-top: 10px' id='news-stream'> " +
      "<iframe  id='AntFrame' src='https://player.mangomolo.com/v1/live?id=MTk0&channelid=MzI0&countries=QUQ=&w=100%25&h=100%25&autoplay=false&filter=DENY&signature=c8f5796585178699ef4df5135a999e24&app_id=40&player_profile=MTM5'" +
      "style='position:absolute;top:0;left:0;width:100%;height:100%;border: 0; overflow: hidden'  allowFullScreen='allowFullScreen'   allow='autoplay'></iframe>" +
      "</div>";

    const iframe = document.getElementById("AntFrame") as HTMLIFrameElement;

    // // // iframe.contentWindow.document.write(
    // // //   "<div style='position:relative;padding-bottom:56.25%;height:0;overflow:hidden;' id='news-stream'> " +
    // // //     "<iframe  src='https://player.mangomolo.com/v1/live?id=MTk0&channelid=MzI0&countries=QUQ=&w=100%25&h=100%25&autoplay=false&filter=DENY&signature=c8f5796585178699ef4df5135a999e24&app_id=40&player_profile=MTM5'" +
    // // //     "style='position:absolute;top:0;left:0;width:100%;height:100%;border: 0; overflow: hidden'  allowFullScreen='allowFullScreen'   allow='autoplay'></iframe>" +
    // // //     "</div>" +
    // // //     "<div style='position:relative;padding-bottom:56.25%;height:0;overflow:hidden;' id='lehae-stream'>" +
    // // //     "<iframe  src='https://player.mangomolo.com/v1/live?id=MTk0&channelid=MzIz&countries=bnVsbA==&w=100%25&h=100%25&autoplay=false&filter=DENY&signature=55edc33f1474df3f29238935a98fcb29&fullscreen=yes&app_id=38&player_profile=MTM5'" +
    // // //     "style='position:absolute;top:0;left:0;width:100%;height:100%;border: 0; overflow: hidden'  allowFullScreen='allowFullScreen'   allow='autoplay'></iframe>" +
    // // //     "</div>"
    // // // );

    iframe.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreen) {
        this.screenOrientation.lock("landscape");
      } else {
        this.screenOrientation.lock("portrait");
      }
    });
  }

  change(num: number) {
    if (num === 0) {
      document.getElementById("live-button").classList.add("viewing");
      document.getElementById("lehae-button").classList.remove("viewing");
      document.getElementById("news-stream").innerHTML =
        "<iframe id='AntFrame' src='https://player.mangomolo.com/v1/live?id=MTk0&channelid=MzIz&countries=bnVsbA==&w=100%25&h=100%25&autoplay=false&filter=DENY&signature=55edc33f1474df3f29238935a98fcb29&fullscreen=yes&app_id=38&player_profile=MTM5'" +
        "style='position:absolute;top:0;left:0;width:100%;height:100%;border: 0; overflow: hidden'  allowFullScreen='allowFullScreen'   allow='autoplay'></iframe>" +
        "</div>";

      const iframe = document.getElementById("AntFrame") as HTMLIFrameElement;
      iframe.addEventListener("fullscreenchange", (event) => {
        if (document.fullscreen) {
          this.screenOrientation.lock("landscape");
        } else {
          this.screenOrientation.lock("portrait");
        }
      });

      document.getElementById("news-playlist").style.display = "block";
      document.getElementById("news-playlistsss").style.display = "none";
    } else if (num === 1) {
      document.getElementById("live-button").classList.remove("viewing");
      document.getElementById("lehae-button").classList.add("viewing");
      document.getElementById("news-stream").innerHTML =
        "<iframe id='AntFrame'  src='https://player.mangomolo.com/v1/live?id=MTk0&channelid=MzI0&countries=QUQ=&w=100%25&h=100%25&autoplay=false&filter=DENY&signature=c8f5796585178699ef4df5135a999e24&app_id=40&player_profile=MTM5'" +
        "style='position:absolute;top:0;left:0;width:100%;height:100%;border: 0; overflow: hidden'  allowFullScreen='allowFullScreen'   allow='autoplay'></iframe>" +
        "</div>";

      const iframe = document.getElementById("AntFrame") as HTMLIFrameElement;
      iframe.addEventListener("fullscreenchange", (event) => {
        if (document.fullscreen) {
          this.screenOrientation.lock("landscape");
        } else {
          this.screenOrientation.lock("portrait");
        }
      });

      document.getElementById("news-playlist").style.display = "none";
      document.getElementById("news-playlistsss").style.display = "block";
    }
  }

  clearLiveStream() {
    this.container.nativeElement.innerHTML = null;
  }

  showOnAir(onAir: boolean) {
    this.onAir = true;
    this.onCatchUp = false;
    this.onAfrican = false;
    if (onAir) {
    }
    document.addEventListener("deviceready", () => {
      this.http
        .get(
          "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes"
        )
        .subscribe(
          (data) => {
            //alert("404 Loaded");
            this.player.src(data["playbackURL"]);
          },
          (error) => {
            //window.alert("Not Loaded");
          }
        );
    });
    if (
      this.playerLehae.src != undefined ||
      this.playerLehae.src != "" ||
      this.playerLehae.src != null
    ) {
      this.playerLehae.pause();
    }
    //this.player.src("https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8");
    // this.onCatchUp = false;
    // this.onAfrican = false;
  }

  showCatchUp(onCatchUp: boolean) {
    this.onAir = false;
    this.onCatchUp = onCatchUp;
    this.onAfrican = false;
    if (
      this.player.src != undefined ||
      this.player.src != "" ||
      this.player.src != null
    ) {
      this.player.pause();
    }

    if (
      this.playerLehae.src != undefined ||
      this.playerLehae.src != "" ||
      this.playerLehae.src != null
    ) {
      this.playerLehae.pause();
    }
    if (onCatchUp) {
      //this.clearLiveStream();
      //  this.watchAd2();
    }

    this.player.pause();
    this.playerLehae.pause();
  }

  showAfrican(onAfrican: boolean) {
    //this.player.src("");

    this.onAir = false;
    this.onCatchUp = false;
    this.onAfrican = onAfrican;
    if (onAfrican) {
      //this.clearLiveStream();
      // this.watchAd2();
    }

    document.addEventListener("deviceready", () => {
      this.http
        .get(
          "https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=326&need_playback=yes"
        )
        .subscribe(
          (data) => {
            //window.alert("lehae Loaded");
            this.playerLehae.src(data["playbackURL"]);
          },
          (error) => {
            //window.alert("Not Loaded");
          }
        );
    });
    if (
      this.player.src != undefined ||
      this.player.src != "" ||
      this.player.src != null
    ) {
      this.player.pause();
    }
    //this.playerLehae.src(
    //"https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8"
    // );
    // this.onAir = false;
    // this.onCatchUp = false;
    // this.onAfrican = onAfrican;
  }

  async watchAd1() {
    this.watchad_1.nativeElement.innerHTML =
      '<iframe scrolling="no" id="watch-banner1" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById(
      "watch-banner1"
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
        "<div id='watchad-1'>" +
        "<script>" +
        "window.googletag = window.googletag || {cmd: []};" +
        "googletag.cmd.push(function() {" +
        "googletag.defineSlot('/267159116/SABCDigitalNewsMobileLeaderboard1', [[320,50]], 'watchad-1').addService(googletag.pubads());" +
        "googletag.pubads().enableSingleRequest();" +
        "googletag.pubads().collapseEmptyDivs();" +
        "googletag.enableServices();" +
        "googletag.display('watchad-1');" +
        " });" +
        "</script>" +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }

  async watchAd2() {
    this.watchad_2.nativeElement.innerHTML =
      '<iframe scrolling="no" id="watch-banner2" allowfullscreen="no"></iframe>';

    const iframe = document.getElementById(
      "watch-banner2"
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
        "<div id='watchad-2'>" +
        "<script>" +
        "window.googletag = window.googletag || {cmd: []};" +
        "googletag.cmd.push(function() {" +
        "googletag.defineSlot('/267159116/SABCDigitalNewsMobileLeaderboard6', [[320,50]], 'watchad-2') .addService(googletag.pubads());" +
        "googletag.pubads().enableSingleRequest();" +
        "googletag.pubads().collapseEmptyDivs();" +
        "googletag.enableServices();" +
        "googletag.display('watchad-2');" +
        " });" +
        "</script>" +
        "</div>" +
        "</body>" +
        "</html>"
    );
  }

  oj() {
    let userid = 194,
      channelID = -5,
      sessionID = this.uidGenerator.generateUniqueID(),
      browserOS = "",
      device = 3,
      app_id = 40;
    this.http
      .post(
        this.setSession(
          userid,
          channelID,
          sessionID,
          browserOS,
          device,
          app_id
        ),
        {}
      )
      .subscribe(
        (data) => {
          alert(
            "Your Stream Details \n1.UserID = " +
              userid +
              "\n2.ChannelID = " +
              channelID +
              "\n3.SessionID = " +
              sessionID +
              "\nisLive : " +
              data["isLive"]
          );
        },
        (e) => {
          alert("Oops");
        }
      );
  }

  setSession(
    userid: number,
    channelID: number,
    sessionID: string,
    browserOS: string,
    device: number,
    app_id: number
  ): string {
    let anayticsURL =
      "https://beacon.mangomolo.com/analytics/index.php/crosssitestats/UpdateOnline";

    let liveSession: string =
      anayticsURL +
      "?userid=" +
      userid +
      "&channelid=" +
      channelID +
      "&sessionid=" +
      sessionID +
      "&browserOS=" +
      browserOS +
      "&device=" +
      device +
      "&app_id=" +
      app_id;

    return liveSession;
  }

  sendSessioAnalytics(sessionURL: string): void {
    this.http.post(sessionURL, {}).subscribe(
      (data) => {
        //alert("isLive" + data["isLive"]);
      },
      () => {
        //alert("notLive");
      }
    );
  }

  segmentChanged(event: any){
    console.log('event', event);
    this.videoCollectionElections = this.videoCollectionElections;
  }
}
