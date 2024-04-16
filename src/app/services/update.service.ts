import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Market } from '@ionic-native/market';

declare const navigator: any;  
declare const device: any; 

interface AppUpdate {
    current : string;
    enabled : boolean;
    msg?: {
        title : string;
        msg : string;
        btn: string;
    };
    majorMsg?:{
        title : string;
        msg : string;
        btn: string;
    };
    minorMsg?:{
        title : string;
        msg : string;
        btn: string;
    }
}

@Injectable({
    providedIn : 'root'
})
export class UpdateService{
    updateURL = 'https://www.sabcnews.com/sabcnews/appupdate.json';

    constructor( private http: HttpClient,
        // private alertCtrl: AlertController,
        private appVersion: AppVersion,
        private iab: InAppBrowser){}
    
        async  chackForUpdate() {
            this.http.get(this.updateURL).subscribe(async( info : AppUpdate) => {

                if(info.enabled){
                    const versionNumber = await this.appVersion.getVersionNumber();

                    const slittedVersion = versionNumber.split('.');
                    const serverVersion = info.current.split('.');

                    if(serverVersion[0] > slittedVersion[0]){
                        console.log('major update ');
                        this.presentAlert(info.majorMsg.title, info.majorMsg.msg, info.majorMsg.btn);
                    }
                    else if (serverVersion[1] > slittedVersion[1]){
                        console.log('minor update', slittedVersion);
                        this.presentAlert(info.minorMsg.title, info.minorMsg.msg, info.minorMsg.btn, true);
                    }
                }
            })
        }

        openAppstoreEntry(buttonIndex){
            console.log('buttonIndex ', buttonIndex);

            
            if(buttonIndex == 1 || buttonIndex == 0){
                var appId = '';
                var devicePlatform = device.platform;

                if(devicePlatform == 'Android'){
                    appId = "com.sabc.sabcnews";
                }
                else if(devicePlatform == 'iOS'){
                    appId = "id1459514467";
                }
                Market.open(appId)
            }
        }

        async  presentAlert (title : string, myMessage : string, buttonText = '', allowClose = false) {
          
            if(buttonText != ''){
                buttonText = 'Download';
            }

            if(allowClose) {
                navigator.notification.confirm(
                    myMessage,                 // message
                    this.openAppstoreEntry,    // callback to invoke
                    title,                     // title
                    [buttonText,'Exit'],       // buttonLabels
                );
            }else{
                navigator.notification.alert(
                    myMessage,                      // message
                    this.openAppstoreEntry,         // callback
                    title,                          // title
                    buttonText                      // buttonName
                );
            }
        }
}