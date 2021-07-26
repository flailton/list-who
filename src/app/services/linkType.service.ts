import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LinkType } from '../models/LinkType';


@Injectable()
export class LinkTypeService {

    constructor(private httpClient: HttpClient) { }

    public index(): Observable<LinkType[]> {
        return this.httpClient
            .get<LinkType[]>(`${environment.apiURL}api/link_types`)
    }
}