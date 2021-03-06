import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(private title: Title) { }

    ngOnInit() {
        this.title.setTitle('AppCo Home Page');
    }
}
