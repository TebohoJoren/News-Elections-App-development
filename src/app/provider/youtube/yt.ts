import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {Platform } from "@ionic/angular";

@Injectable()
export class YtProvider {


  apiKey = "AIzaSyCYGhUTOcaEQdhVKjxGwAtHZYsirGe0cp4";

  constructor(public http: HttpClient,
    private platform: Platform,) {
        if (this.platform.is("ios")) {
          this.apiKey = "AIzaSyA4-7ccn3x7CvnqojtR-GT338QCKlN8TBE";
        }
        else { 
          this.apiKey = "AIzaSyBkZBnEUba955IsZMu4zx96J6O1EmhB_CQ";
        }
  }

  // getPlaylistsForChannel(channel) {
  //   return this.http
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=20&order=date&key=${
  //         this.apiKey
  //       }`,
  //     )
  //     .pipe(
  //       map(res => {
  //         return res["items"];
  //       }),
  //     );
  // }

  getListVideos(listId) {
    return this.http
      .get(
        "https://www.googleapis.com/youtube/v3/playlistItems?broadcastStatus=active&key=" +
          this.apiKey +
          "&playlistId=" +
          listId +
          "&part=id,snippet&maxResults=20",
      )
      .pipe(
        map(res => {
          return res["items"];
        },
          e => { 
            JSON.stringify(e);
        }),
      );
  }

  // getVideos(list: string) {
  //   return this.http
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${list}&key=${
  //         this.apiKey
  //       }`,
  //     )
  //     .pipe(
  //       map(res => {
  //         return res["items"];
  //       }),
  //     );
  // }
}
