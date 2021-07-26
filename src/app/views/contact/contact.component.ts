import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  public contacts: Contact[];

  constructor(private contactService: ContactService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.index();
  }

  public index() : void{
    this.contactService.index().subscribe(data => {
      this.contacts = data;
    },
    error => {
      // let contact: Contact = new Contact();
      // contact.id = parseInt(this.authService.getContact());
      // this.show(contact);
    });
  }

  public show(contato: Contact) :void{
    this.contactService.show(contato).subscribe(data => {
      this.router.navigate([`contatos/visualizar/${data.id}`]);
    },
    error => {
    });
  }

  public destroy(contact: Contact) : void{
    this.contactService.destroy(contact).subscribe(data => {
      alert('Contato excluído com sucesso!');
      window.location.reload(); 
    },
    error => {
    });
  }

}
