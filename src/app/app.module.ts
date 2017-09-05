import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app.router';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      BrowserModule,
      PagesModule,
      AppRoutingModule,
      ToastrModule.forRoot({
          timeOut: 2000,
          closeButton: false,
          positionClass: 'toast-top-center',
          preventDuplicates: true,
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
