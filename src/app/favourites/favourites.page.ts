import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, IonList } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { IonInfiniteScroll, IonContent } from "@ionic/angular";
import * as _ from "lodash";
import { Observable } from "rxjs";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.page.html",
  styleUrls: ["./favourites.page.scss"]
})
export class FavouritesPage {
  bookmarkdata: Observable<any>;
  keys: any;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    public navCtrl: NavController,
    public elementRef: ElementRef,
  ) {
    this.getData();
  }
  pageRefresh(refresher){
    this.getData();
    refresher.complete();
  }

  loadData(event) {
    this.getData();
    event.target.complete();
  }

  getData() {
    this.bookmarkdata = this.getCachedData();
    return this.bookmarkdata;
  }
  getCachedData() {
    return JSON.parse(localStorage.getItem("bookmarked Articles"));
  }
}
