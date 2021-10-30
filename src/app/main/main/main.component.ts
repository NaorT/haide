import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { User } from '../../auth/state/auth.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { YoutubeResult } from '../../youtube/state/youtube.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  options?: FormGroup = new FormGroup({
    bottom: new FormControl(0),
    fixed: new FormControl(true),
    top: new FormControl(0)
  });
  user$: Observable<User | null> = this.authQuery.selectUser$;
  

  constructor(private authQuery: AuthQuery) { }

  ngOnInit(): void {

  }

  search($event: string) {
    console.log($event);
  }

}
