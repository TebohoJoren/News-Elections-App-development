import { Component, OnInit } from '@angular/core';
import { Cordova } from "@ionic-native/core";
declare var cordova: any;
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openYTChannel(){
    cordova.InAppBrowser.open("https://www.youtube.com/@sabcdigitalnews", "_blank", "location=no");
  }

  openNewsWesite(){
    cordova.InAppBrowser.open("https://www.sabcnews.com/sabcnews/", "_blank", "location=no");
  }

  openNewsPolicies(){
    cordova.InAppBrowser.open("https://www.sabc.co.za/sabc/disclaimer/", "_blank", "location=no");
  }
}
