import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElectionsPageModule } from "../elections/elections.module";
import { FavouritesPageModule } from "../favourites/favourites.module";
import { newsPageModule } from "../news/news.module";
import { NewsDetailPageModule } from "../newsdetail/newsdetail.module";
import { radioPageModule } from "../radio/radio.module";
import { SearchResultsPageModule } from "../searchresults/searchresults.module";
import { SettingsPageModule } from "../settings/settings.module";
import { videosPageModule } from "../videos/videos.module";
import { TabsPage } from "./tabs.page";
import { PrivacyPoliciesComponent } from "../privacy-policies/privacy-policies.component";
import { PrivacyPolicyPageModule } from "../privacy-policy/privacy-policy.module";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: 'news',
        children: [
          {
            path:'',
            loadChildren: () => newsPageModule 
          }
        ]
      },
      {
        path: "news/cat/:catid",
        children: [
          {
            path: "",
            loadChildren: () => newsPageModule 
          }
        ]
      },
      {
        path: "newsdetails/:id",
        children: [
          {
            path: "",
            loadChildren: ()=> NewsDetailPageModule 
          }
        ]
      },
      {
        path: "radio",
        children: [
          {
            path: "",
            loadChildren: ()=> radioPageModule 
          }
        ]
      },
      {
        path: "videos",
        children: [
          {
            path: "",
            loadChildren: ()=> videosPageModule
          }
        ]
      },
      {
        path: "elections",
        children: [
          {
            path: "",
            loadChildren: ()=>ElectionsPageModule 
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: ()=>SettingsPageModule 
          }
        ]
      },
      {
        path:"privacy",
        children: [
          {
            path:"",
            loadChildren: () => PrivacyPolicyPageModule
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/news",
        pathMatch: "full"
      },
      {
        path: "favourites",
        children: [
          {
            path: "",
            loadChildren: () => FavouritesPageModule 
          }
        ]
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/news",
    pathMatch: "full"
  },
  {
    path: "tabs/news/search",
    loadChildren: () =>  SearchResultsPageModule 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
