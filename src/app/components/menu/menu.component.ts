import { Component } from '@angular/core';
import { ParameterService } from 'src/app/Services/parameter.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    public parameterServices: ParameterService
  ){}
}
