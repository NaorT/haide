import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoItemComponent } from './video-item/video-item.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';


@NgModule({
  declarations: [
    VideoItemComponent
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  exports: [VideoItemComponent]
})
export class VideoItemModule { }
