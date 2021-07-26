import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/Contact';


@Injectable()
export class ContactService {

    constructor(private httpClient: HttpClient) { }

    public index(): Observable<Contact[]> {
        return this.httpClient
            .get<Contact[]>(`${environment.apiURL}api/contacts`)
    }

    public show(contact: Contact): Observable<Contact> {
        return this.httpClient
            .get<Contact>(`${environment.apiURL}api/contacts/${contact.id}`);
    }

    public update(contact: Contact): Observable<Contact> {
        return this.httpClient
            .patch<Contact>(`${environment.apiURL}api/contacts/${contact.id}`, contact);
    }

    public store(contact: Contact): Observable<Contact> {
        return this.httpClient
            .post<Contact>(`${environment.apiURL}api/contacts`, contact);
    }

    public destroy(contact: Contact): Observable<Contact> {
        return this.httpClient
            .delete<Contact>(`${environment.apiURL}api/contacts/${contact.id}`);
    }
}