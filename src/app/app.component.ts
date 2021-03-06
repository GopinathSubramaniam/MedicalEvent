import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('>>>>>>>called>>>>>>>')
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });

    /*  let userName = sessionStorage.getItem('userName');
     if (!userName) this.router.navigate(['/login']); */
  }
}
