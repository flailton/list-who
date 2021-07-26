import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html'
})
export class ContactShowComponent implements OnInit {
  public contact: Contact;

  constructor(private contactService: ContactService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.contact = new Contact();
    this.activatedRoute.params.subscribe(params => {
      this.contact.id = params['id'];
    });

    this.show(this.contact);
  }

  public show(contact: Contact) :void{
    this.contactService.show(contact).subscribe(data => {
      this.contact = data;
    },
    error => {
    });
  }

}
