import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp } from '@firebase/app';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarModule } from './search-bar/search-bar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarModule } from './snack-bar/snack-bar.module';

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
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    SnackBarModule,
    SearchBarModule,
    MatDialogModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFirebase,
      deps: [], multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
