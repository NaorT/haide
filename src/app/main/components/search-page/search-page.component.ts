import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeResult } from '../../../youtube/state/youtube.model';
import { YoutubeQuery } from '../../../youtube/state/youtube.query';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchPageResults$?: Observable<YoutubeResult[]> = this.youtubeQuery.selectSearchPageResults$;

  constructor(private youtubeQuery: YoutubeQuery) { }

  ngOnInit(): void { }

  playSong(item: YoutubeResult) {
    console.log(item);
    

  }

}
