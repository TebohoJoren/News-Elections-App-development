import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { FavouritesPage } from "./favourites.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild([{ path: "", component: FavouritesPage }])
  ],
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
