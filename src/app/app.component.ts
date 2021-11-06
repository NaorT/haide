import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'haide';
  activeRouter$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((navEndEvent) => navEndEvent as NavigationEnd),
    (map((e) => e.url.includes('search'))));
  constructor(private router: Router) { }

}
