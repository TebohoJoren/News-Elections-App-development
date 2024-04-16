import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-live-stream",
  templateUrl: "./live-stream.component.html",
  styleUrls: ["./live-stream.component.scss"],
})
export class LiveStreamComponent implements OnInit {
  public url: "https://sabconetanw.cdn.mangomolo.com/news/smil:news.stream.smil/playlist.m3u8?stime=20240104063455&etime=20240111103635&token=04d3be1ee46c715278575";

  constructor() {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {}
}
