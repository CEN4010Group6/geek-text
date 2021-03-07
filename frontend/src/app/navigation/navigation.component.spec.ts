import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './navigation.component';
import { UsersModule } from '../users/users.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [ NgbModule, RouterTestingModule, UsersModule, HttpClientTestingModule ],
      providers: [ UserService, AuthService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle navigation', () => {
    expect(component.isCollapsed()).toBe(true);
    component.toggleCollapsed();
    expect(component.isCollapsed()).toBe(false);
  })
});
