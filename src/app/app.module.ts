import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing-module.module';
import { HomeModule } from './home/home.module';

export let AppInjector: Injector;

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [BrowserModule, FormsModule, HomeModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
