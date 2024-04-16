import { Component, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { NavController, IonList , LoadingController} from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { IonInfiniteScroll, IonContent } from "@ionic/angular";
import * as _ from "lodash";

@Component({
  selector: "app-searchresults",
  templateUrl: "searchresults.page.html",
  styleUrls: ["searchresults.page.scss"]
})
export class SearchResultsPage {
  data: any;
  olderData: any;
  rawData: any;
  currentPage: number = 1;
  currentCategory: string = null;
  searchWord = "";
  showSearch: boolean = false;
  searchResults: boolean = true;
  private url;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public loadingController: LoadingController,
  ) {
    let searchIcon = this.elementRef.nativeElement.querySelector(
      ".searchbar-search-icon"
    );
    this.getData();

    if (searchIcon != null) {
      this.renderer.listen(searchIcon, "click", event => {
        this.searchArticle(event);
      });
    }
  }
  commitData(data) {
    localStorage.setItem("news", null);
    localStorage.setItem("news", JSON.stringify(data));

    return data;
  }

  getCachedData() {
    return JSON.parse(localStorage.getItem("news"));
  }

  getData(page: number = 1) {
    this.url = `http://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&page=1&_embed`;
    this.http.get(this.url).subscribe(
      data => {
        this.data = this.commitData(data);
      },
      e => {
        console.log(e);
        if (localStorage.getItem("news") !== null) {
          this.data = this.getCachedData();
        }
      }
    );

    this.data = this.getCachedData();
  }
  loadData(event) {
    this.url = `http://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&_embed&page=${++this
      .currentPage}${
      this.searchWord != null ? "&search=" + this.searchWord : ""
    }`;
    this.http.get(this.url).subscribe(
      data => {
        this.data = this.data.concat(data);
        event.target.complete();
      },
      e => {
        event.target.complete();
        console.log(e);
      }
    );
  }

  showMoreResults() {
    this.getData(++this.currentPage);
  }

  
 async searchArticle(event) {
    this.url = `http://www.sabcnews.com/sabcnews/wp-json/wp/v2/posts?per_page=20&_embed&page=1&search=${
      this.searchWord
    }`;
    this.data = null;
    const loading = await this.loadingController.create({
      message: 'Please wait..',
      spinner: 'circles',
    });
    loading.present();

    this.http.get(this.url).subscribe(
      data => {
        this.data = this.commitData(data);
        if (
          this.data == undefined ||
          this.data == null ||
          this.data.length === 0
        ) {
          this.searchResults = false;
        } else {
          this.searchResults = true;
        }

        loading.dismiss();
      },
      e => {
        event.target.complete();
        console.log(e);
        loading.dismiss();
      }
    );
  }
}
