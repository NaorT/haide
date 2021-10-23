import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp } from '@firebase/app';
import { environment } from '../environments/environment';

export function initFirebase() {
  return () => initializeApp(environment.firebaseConfig);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFirebase,
      deps: [], multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
