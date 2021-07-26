import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public showMenuEmitter: EventEmitter<boolean>;

  constructor(){
    this.showMenuEmitter = new EventEmitter<boolean>();
    this.showMenuEmitter.emit(false);
  }

  public clearToken(): void {
    this.showMenuEmitter.emit(false);
    window.sessionStorage.removeItem('token');
  }

  private Token(): any {
    var token;
    if (token = window.sessionStorage.getItem('token')) {
      return JSON.parse(token);
    }

    return false;
  }

  public getToken(): any {
    var token;

    if (token = this.Token()) {
      return token.access_token;
    }

    return false;
  }

  public getUser(): any {
    var token;
    if (token = this.Token()) {
      return token.user;
    }
    
    return 0;
  }

  public setToken(token: string): void {
    this.showMenuEmitter.emit(true);
    window.sessionStorage.setItem('token', token);
  }

  public isAuthenticated(): Boolean {
    var token;
    if (token = this.Token()) {
      this.showMenuEmitter.emit(Boolean(token.access_token));
      return Boolean(token.access_token);
    }

    this.showMenuEmitter.emit(false);
    return false;
  }
}
