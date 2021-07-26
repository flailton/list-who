import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public currentYear = (new Date()).getFullYear();
  public author: string = "Flailton Batista";
  public version: string = "11.0";
}
