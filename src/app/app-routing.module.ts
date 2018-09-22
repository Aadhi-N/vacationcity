import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerComponent } from "./banner/banner.component";
import { FilterResultsComponent } from "./filter-results/filter-results.component";

const routes: Routes = [
  { path: '', redirectTo: '/banner', pathMatch: 'full' },
  { path: 'banner', component: BannerComponent },
  { path: 'filter-results', component: FilterResultsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
