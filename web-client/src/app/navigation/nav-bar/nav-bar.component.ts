import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ot-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends BaseComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    const sub = this.authService.onAuthUpdate().subscribe(user => {
      this.currentUser = user;
    });
    this.subscribed(sub);
  }

  logout() {
    this.authService.logout();
  }
}
