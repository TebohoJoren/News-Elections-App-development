import { Observable } from "rxjs";

export class playListCollection {
  selected: boolean;
  label: string;
  playlistId: string;
  videos: Observable<any[]>;

  constructor(playlist: string, lbl: string, selected: boolean = false) {
    this.playlistId = playlist;
    this.label = lbl;
    this.selected = selected;
  }
}
