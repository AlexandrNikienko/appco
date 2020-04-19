import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHomePage: boolean;

  constructor(private router: Router) {
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //this.isHomePage = event.url === "/";
        event.url === "/" ? document.body.classList.add('home-page') : document.body.classList.remove('home-page');
      }
      )
  }
}
