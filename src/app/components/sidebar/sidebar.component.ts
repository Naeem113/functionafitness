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
    path: '/equipments',
    title: 'Equipments',
    icon: 'fitness_center',
    class: '',
  },
  {
    path: '/quotes',
    title: 'Quotes',
    icon: 'library_books',
    class: '',
  },
  {
    path: '/exercises',
    title: 'Exercises',
    icon: 'directions_run',
    class: '',
  },
  {
    path: '/posts',
    title: 'Posts',
    icon: 'email',
    class: '',
  },
  {
    path: '/bodyparts',
    title: 'Bodyparts',
    icon: 'airline_seat_legroom_reduced',
    class: '',
  },

  {
    path: '/levels',
    title: 'Levels',
    icon: 'signal_cellular_alt',
    class: '',
  },

  {
    path: '/workouts',
    title: 'Workouts',
    icon: 'airline_seat_recline_extra',
    class: '',
  },
  {
    path: '/goals',
    title: 'Goals',
    icon: 'emoji_events',
    class: '',
  },
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
