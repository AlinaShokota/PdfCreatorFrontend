import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WebsiteFormComponent } from './components/website-form/website-form.component';
import { SimpleContractFormComponent } from './components/simple-contract-form/simple-contract-form.component';
import { WebsitePriceComponent } from './components/website-price/website-price.component';
import { SimpleContractComponent } from './components/simple-contract/simple-contract.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WebsiteFormComponent,
    SimpleContractFormComponent,
    WebsitePriceComponent,
    SimpleContractComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
