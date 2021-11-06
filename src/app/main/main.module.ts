import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { VideoItemModule } from '../video-item/video-item.module';
import { PlaylistPageComponent } from './components/playlist-page/playlist-page.component';
import { SearchResultItemModule } from './components/search-result-item/search-result-item.module';
import { CreatePlaylistPopupComponent } from './create-playlist-popup/create-playlist-popup/create-playlist-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    SearchPageComponent,
    PlaylistPageComponent,
    CreatePlaylistPopupComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    SearchBarModule,
    VideoItemModule,
    SearchResultItemModule,
  ]
})
export class MainModule { }
