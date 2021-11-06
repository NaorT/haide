import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { YoutubeQuery } from '../../youtube/state/youtube.query';
import { YoutubeService } from '../../youtube/state/youtube.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input() ctx: string = 'search | playlist';
  @Input() placeholder: string = 'Search...'
  form = new FormGroup({
    searchTerm: new FormControl()
  });

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.form.controls['searchTerm'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.youtubeService.search(value, this.ctx)),
    ).subscribe()
  }
}
