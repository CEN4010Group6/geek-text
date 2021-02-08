import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private _isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this._isCollapsed);
  }

  public get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  public toggleCollapsed() {
    this._isCollapsed = !this._isCollapsed;
    console.log(this._isCollapsed);
  }
}
