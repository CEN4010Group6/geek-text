import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  public get isCollapsed(): boolean {
    return this.collapsed;
  }

  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
