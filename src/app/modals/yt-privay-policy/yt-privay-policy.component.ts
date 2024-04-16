import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-yt-privay-policy',
  templateUrl: './yt-privay-policy.component.html',
  styleUrls: ['./yt-privay-policy.component.scss'],
})
export class YtPrivayPolicyComponent implements OnInit {

  local: string;
  constructor(private mdlCtr: ModalController, private router: Router, private http: HttpClient) { }

  ngOnInit() {}

  confirm(){
    this.mdlCtr.dismiss();
    this.loadLocal();
  }

  openPolicies(){
  }

  loadLocal () {
    // Use the HttpClient to fetch the local HTML file
    this.http.get('assets/i.html', { responseType: 'text' }).subscribe(
      (htmlContent) => {
        this.local = htmlContent;
      },
      (error) => {
        console.error('Error loading local HTML content:', error);
      }
    );
  }

}
