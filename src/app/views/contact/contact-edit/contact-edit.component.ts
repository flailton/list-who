import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { Link } from 'src/app/models/Link';
import { LinkType } from 'src/app/models/LinkType';
import { Phone } from 'src/app/models/Phone';
import { PhoneType } from 'src/app/models/PhoneType';
import { ContactService } from 'src/app/services/contact.service';
import { LinkTypeService } from 'src/app/services/linkType.service';
import { PhoneTypeService } from 'src/app/services/phoneType.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit {
  public contact: Contact;
  public phone_types: PhoneType[];
  public link_types: LinkType[];
  public phoneAdd: Phone;
  public phone_type_id: number = 0;
  public title: string;

  constructor(
    private contactService: ContactService,
    private phoneTypeService: PhoneTypeService,
    private linkTypeService: LinkTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contact = new Contact();
    this.phoneAdd = new Phone();
    this.activatedRoute.params.subscribe(params => {
      this.title = 'Cadastrar';
      if (params['id'] !== undefined) {
        this.contact.id = params['id'];
        this.title = 'Editar';
      }
    });

    this.show(this.contact);
  }

  public show(contact: Contact): void {
    if (this.contact.id !== undefined) {
      this.contactService.show(contact).subscribe(data => {
        this.contact = data;
        this.indexLinkTypes();
        this.indexPhoneTypes();
      },
        error => {
          alert(error.errors.join(' <br/> '));
          this.router.navigate(['contatos']);
        });
    } else {
      this.contact.links = new Array<Link>();
      this.contact.phones = new Array<Phone>();
      this.indexLinkTypes();
      this.indexPhoneTypes();
    }
  }

  public store(contact: Contact): void {
    contact.links = contact.links.filter(value => value.link !== undefined && value.link.trim() !== '');

    this.contactService.store(contact).subscribe(data => {
      this.contact = data;
      this.router.navigate(['contatos']);
    },
      error => {
        alert(error.errors.join(' <br/> '));
      });
  }

  public update(contact: Contact): void {
    var links = new Array<Link>();
    
    links = contact.links.filter(value => value.link !== undefined && value.link.trim() !== '');
    
    var contactUpdate = new Contact(
      contact.id,
      contact.user,
      contact.name,
      contact.email,
      links,
      contact.phones
    );

    this.contactService.update(contactUpdate).subscribe(data => {
      this.contact = data;
      this.router.navigate(['contatos']);
    },
      error => {
        alert(error.errors.join(' <br/> '));
      });
  }

  public indexPhoneTypes(): void {
    this.phoneTypeService.index().subscribe(data => {
      this.phone_types = data;
    },
      error => {
        alert(error.errors.join(' <br/> '));
      });
  }

  public indexLinkTypes(): void {
    this.linkTypeService.index().subscribe(data => {
      this.link_types = data;
      this.link_types.forEach((value, index) => {
        if (!this.contact.links.some(function (el) { return el.link_type.id === value.id })) {
          var link = {
            id: null,
            link_type_id: value.id,
            link: '',
            link_type: {
              id: value.id,
              name: value.name
            }
          };
          this.contact.links.push(link);
          this.contact.links.sort((a, b) => a.link_type.name.localeCompare(b.link_type.name));
        }
      });
    },
      error => {
        alert(error.errors.join(' <br/> '));
      });
  }

  public addPhone(): void {
    var canAdd = true;
    if (this.phoneAdd.phone === undefined || this.phoneAdd.phone.trim() === '') {
      alert('O número telefônico não pode estar vazio!');
      return;
    }

    if (this.phone_type_id === undefined || this.phone_type_id === 0) {
      alert('O tipo do número telefônico não pode estar vazio!');
      return;
    }

    this.phone_types.forEach((value, index) => {
      if (value.id == this.phone_type_id) {
        this.phoneAdd.phone_type = value;
      }
    });

    this.contact.phones.forEach((value, index) => {
      if (value.phone == this.phoneAdd.phone && value.phone_type.id == this.phoneAdd.phone_type.id) canAdd = false;
    });

    if (!canAdd) {
      alert('Número de telefone já adicionado!');
      return;
    }

    this.phoneAdd.phone_type_id = this.phone_type_id;
    this.contact.phones.push(this.phoneAdd);
    this.phoneAdd = new Phone();
    this.phone_type_id = 0;
  }

  public removePhone(phone: Phone): void {
    this.contact.phones.forEach((value, index) => {
      if (value.phone_type.id == phone.phone_type.id && value.phone == phone.phone) {
        this.contact.phones.splice(index, 1);
      }
    });
  }

  public hasLinkType(link_type_id: number): boolean {
    return true;
  }

}
