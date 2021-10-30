import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { YoutubeQuery } from '../../youtube/state/youtube.query';
import { YoutubeService } from '../../youtube/state/youtube.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  form = new FormGroup({
    searchTerm: new FormControl()
  });
  shouldShow$?: Observable<boolean>;

  constructor(private router: Router, private youtubeService: YoutubeService) {
    this.shouldShow$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((ev) => (ev as NavigationEnd).url.includes('/search')),
    );
  }

  ngOnInit(): void {
    this.form.controls['searchTerm'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.youtubeService.search(value)),
    ).subscribe()
  }
}
