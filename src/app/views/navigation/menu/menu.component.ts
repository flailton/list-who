import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent {
  @Input() showMenu: boolean = false;
}
