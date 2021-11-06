import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoItemComponent } from './video-item/video-item.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    VideoItemComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule
  ],
  exports: [VideoItemComponent]
})
export class VideoItemModule { }
