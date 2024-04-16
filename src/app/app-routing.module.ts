import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ElectionsNewsPageModule } from "./elections-news/elections-news.module";
import { ElectionsPageModule } from "./elections/elections.module";
import { NewsDetailPageModule } from "./newsdetail/newsdetail.module";
import { radioPageModule } from "./radio/radio.module";
import { SettingsPageModule } from "./settings/settings.module";
import { TabsPageModule } from "./tabs/tabs.module";
import { videosPageModule } from "./videos/videos.module";

const routes: Routes = [
  { 
    path: "",
    loadChildren: ()=> TabsPageModule 
  },
  {
    path: "tabs/news/cat/:catid",
    loadChildren: ()=> NewsDetailPageModule
  },
  {
    path: "tabs/news/:id",
    loadChildren: ()=> NewsDetailPageModule 
  },

  {
    path: "tabs/videos",
    loadChildren: ()=>  videosPageModule 
  },
  {  
    path: "tabs/radio", 
    loadChildren: ()=> radioPageModule 
  },
  { 
    path: 'elections', 
    loadChildren: ()=> ElectionsPageModule 
  },
  { 
    path: 'settings', 
    loadChildren: ()=> SettingsPageModule 
  },

  { 
    path: 'settings/watch',
    redirectTo: 'tabs/videos'
  },
  { 
    path: 'settings/news', 
    redirectTo: 'tabs/news' 
  },
  { 
    path: 'settings/listen', 
    redirectTo: 'tabs/radio' 
  },
  { 
    path: 'elections-news', 
    loadChildren: ()=> ElectionsNewsPageModule 
  },  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'reader-stop-modal',
    loadChildren: () => import('./modals/reader/reader-stop-modal/reader-stop-modal.module').then( m => m.ReaderStopModalPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
