import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SimpleContractComponent } from './components/simple-contract/simple-contract.component';
import { WebsitePriceComponent } from './components/website-price/website-price.component';
import { TraveldeskReportComponent } from './components/traveldesk-report/traveldesk-report.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contract', component: SimpleContractComponent },
  { path: 'website', component: WebsitePriceComponent },
  { path: 'traveldesk', component: TraveldeskReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
