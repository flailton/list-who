import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhoneType } from '../models/PhoneType';


@Injectable()
export class PhoneTypeService {

    constructor(private httpClient: HttpClient) { }

    public index(): Observable<PhoneType[]> {
        return this.httpClient
            .get<PhoneType[]>(`${environment.apiURL}api/phone_types`)
    }
}