import { Component, OnInit } from "@angular/core";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";

@Component({
  selector: "app-reader-stop-modal",
  templateUrl: "./reader-stop-modal.page.html",
  styleUrls: ["./reader-stop-modal.page.scss"],
})
export class ReaderStopModalPage implements OnInit {
  loadingState: string = "";
  constructor() {}

  ngOnInit() {
    this.loadingState = localStorage.getItem("read");
  }

  stop() {
    if (this.loadingState == "reading") {
      const txt = new TextToSpeech();
      txt.stop;
      localStorage.setItem("read", "stopping");
    }
  }
}
