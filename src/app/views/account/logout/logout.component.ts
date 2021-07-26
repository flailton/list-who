import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: [
  ]
})
export class LogoutComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { 
  }

  ngOnInit(): void {
    this.logout();
  }

  public logout() :void{
    this.accountService.logout().subscribe(data => {
      alert('Logout realizado com Sucesso!');

      setTimeout(() => {
        this.router.navigate(['login']);
      }, 500);
    },
    error => {
      alert(error.errors.join('<br/>'));
    });
  }

}