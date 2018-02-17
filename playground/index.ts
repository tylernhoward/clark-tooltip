/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TooltipModule }  from 'clark-tooltip';

@Component({
  selector: 'app',
  template: `<p tip = "hello there">hover me</p>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, TooltipModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
