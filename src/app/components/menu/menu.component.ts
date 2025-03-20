import { Component } from '@angular/core';
import { ParameterService } from 'src/app/Services/parameter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    public parameterServices: ParameterService,
    private router: Router,
  ) { }

  RedirectToAdmin() {
    this.router.navigate(['/Admin']);
  }

  RedirectToHome() {
    this.router.navigate(['/Home']);
  }
}
