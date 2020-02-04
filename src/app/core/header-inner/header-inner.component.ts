import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent implements OnInit {

  userName: string = '';
  constructor(private router: Router) {

  }

  ngOnInit() {
    let userName = sessionStorage.getItem('userName');
    this.userName = userName;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
