import { Component, ViewChild, ElementRef,AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController, Platform,LoadingController } from "@ionic/angular";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// var vega = require('vega');
// var vegalite = require('vega-lite');
// var vegaembed = require('vega-embed');

@Component({
  selector: "app-elections",
  templateUrl: "./elections.page.html",
  styleUrls: ["./elections.page.scss"]
})
export class ElectionsPage{

  @ViewChild('graph1') graph1: ElementRef;
  @ViewChild('graphframe') graphframe: ElementRef;
  select_year:string='1091';
  select_province:string='EC';
  select_graph:string='race_for_votes';
  constructor(
    private http: HttpClient,
    private plt: Platform,
    public navCtrl: NavController,
    public elRef: ElementRef,
    public loadingController: LoadingController,
    private iab: InAppBrowser
  ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000
    });
    return loading.present();

    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }

  ngOnInit() {
    
  }

  openURL(){
    let browser = this.iab.create("https://elections.sabc.co.za/", '_system');
    browser.show();
  }

  ionViewDidEnter(){
    this.buildGraph(); 
  }

  buildGraph(){
    //Update iFrame URL
    let rand=Math.floor(Math.random() * 10000000);
    var url='https://elections.sabc.co.za/elections/_api/iframe.php?type='+this.select_graph+'&event='+this.select_year+"&geo="+this.select_province+'&rand='+rand;
    //console.log(url);
    this.graphframe.nativeElement.src=url;
  }
}