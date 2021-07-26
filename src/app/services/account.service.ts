import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Authentication } from '../models/Authentication';
// import { ResponseLogout } from '../models/ResponseLogout';
// import { RequestLogout } from '../models/RequestLogout';


@Injectable()
export class AccountService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    public login(email: string, password: string): Observable<Authentication> {
        return this.httpClient
            .post<Authentication>(`${environment.apiURL}api/auth/login`, { 'email': email, 'password': password })
            .pipe(
                tap(
                    (response) => this.authService.setToken(JSON.stringify(response))
                )
            );
    }

    public logout(): Observable<string> {
        return this.httpClient
            .post<string>(`${environment.apiURL}api/auth/logout`, { })
            .pipe(
                tap((response) => (this.authService.clearToken()))
            );
    }
}