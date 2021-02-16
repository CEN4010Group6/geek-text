import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private collapsed = true;

  constructor() {}

  ngOnInit(): void {}

  public isCollapsed(): boolean {
    return this.collapsed;
  }

  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
