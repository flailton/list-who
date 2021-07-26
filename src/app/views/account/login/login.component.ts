import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public userEmail: string;
  public userPassword: string;
  public isAuthenticated: Boolean;

  constructor(private accountService: AccountService, private router: Router, private authService: AuthService) { 
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['contatos']);
    }
  }

  public login() :void{
    this.accountService.login(this.userEmail, this.userPassword).subscribe(data => {
      alert('Login realizado com Sucesso!');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    error => {
      alert(error.errors.join('<br/>'));
    });
  }

}
