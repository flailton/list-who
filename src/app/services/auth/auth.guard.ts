import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.sessionStorage.getItem('token');

    if(!token){
      alert('Usuário não autenticado!');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
  
}
