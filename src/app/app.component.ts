import { Component, OnInit } from '@angular/core';
import { LayoutService } from './dataService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private checkAuthSatat: LayoutService) {}

  ngOnInit() {
    this.checkAuthSatat.isathenticate();
  }
}
