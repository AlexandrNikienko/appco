import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.module.routes';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UserStatisticsModule } from './user-statistics/user-statistics.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: !Boolean(history.pushState) }),
    FormsModule,
    HomeModule,
    UserStatisticsModule,
    UserModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
