import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  {
    path: '/what-am-i-feeling',
    title: 'What am i feeling',
    icon: 'emoji_emotions',
    class: '',
  },
  
  {
    path: '/journals',
    title: 'Journals',
    icon: 'receipt',
    class: '',
  },
  
  {
    path: '/skills',
    title: 'Skills',
    icon: 'airline_seat_legroom_reduced',
    class: '',
  },

  // {
  //   path: '/levels',
  //   title: 'Levels',
  //   icon: 'signal_cellular_alt',
  //   class: '',
  // },

  // {
  //   path: '/workouts',
  //   title: 'Workouts',
  //   icon: 'airline_seat_recline_extra',
  //   class: '',
  // },
  // {
  //   path: '/goals',
  //   title: 'Goals',
  //   icon: 'emoji_events',
  //   class: '',
  // },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
