import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  highQuality: boolean = true;
  text: boolean = false;
  public data: any;
  public abbr: any;
  hideRegions: boolean = true;
  regions: Array<any> = [
    { name: "All", id: "" },
    { name: "Eastern Cape", id: "95", abbr: "EC" },
    { name: "Free State", id: "314", abbr: "FS" },
    { name: "Gauteng", id: "54", abbr: "GP" },
    { name: "KwaZulu-Natal", id: "231", abbr: "KZN" },
    { name: "Limpopo", id: "41", abbr: "LP" },
    { name: "Mpumalanga", id: "216", abbr: "MP" },
    { name: "North West", id: "218", abbr: "NW" },
    { name: "Northern Cape", id: "88", abbr: "NC" },
    { name: "Western Cape", id: "100", abbr: "WP" }
  ];
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.data = localStorage.getItem("region");
    if(this.data != null && this.data.length > 0)
    {
      this.abbr = this.regions.find(ob => ob["id"] === this.data).abbr;
    }
  }

  ngOnInit() {}

  gotoPage(url) {
    this.navCtrl.navigateForward(url);
  }

  updateSettings() {
    this.storage.set(
      "settings",
      JSON.stringify({
        highQuality: this.highQuality,
        text: this.text
      })
    );

    var root = document.getElementsByTagName('html')[0];
    if (this.text) {
      root.classList.add('large-font');
    } else {
      root.className = root.className.replace( new RegExp('(?:^|\\s)' + 'large-font' + '(?:\\s|$)'),' ');
    }
  }
  onChangeHandler($event) {
    this.data = $event.target.value;
    this.hideRegions = true;
    if (this.data != null && this.data.length > 0) {
      let province = this.regions.find(ob => ob["id"] === this.data);
      this.abbr = province.abbr;
      localStorage.setItem("region", this.data);
    } else {
      localStorage.removeItem("region");
      this.abbr = "All";
    }
  }
  viewRegions() {
    if (this.hideRegions == false) {
      this.hideRegions = true;
    } else {
      this.hideRegions = false;
    }
  }
}
