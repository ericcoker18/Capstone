import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactTypes } from '../contact-types';
import { ContactService } from '../contact.service';
import { IContact } from '../icontact';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  x = "test";

  firstname: FormControl;
  lastname: FormControl;
  emailaddress: FormControl;
  primaryphonenumber: FormControl;
  secondaryphonenumber: FormControl;
  address: FormControl;
  type: FormControl;
  types: any[] = ContactTypes.getContactTypes();

  form: FormGroup;

  contact: IContact;

  @Input() contact: IContact;
  constructor(private contactservice: ContactService, private formbuilder: FormBuilder, private activatesRoute: ActivatedRoute) {

    this.form = this.BuildForm();
  }

  async ngOnInit() {
    const id = +this.activatesRoute.snapshot.params['id'];
    this.contact = await this.contactservice.getContact(id);
    this.firstname.setValue(this.contact.firstName);
  }

  BuildForm(): FormGroup {
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.emailaddress = new FormControl('', Validators.required);
    this.primaryphonenumber = new FormControl('', Validators.required);
    this.secondaryphonenumber = new FormControl('');
    this.address = new FormControl('', Validators.required);
    this.type = new FormControl(0);

    return this.formbuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
      emailaddress: this.emailaddress,
      primaryphonenumber: this.primaryphonenumber,
      secondaryphonenumber: this.secondaryphonenumber,
      address: this.address,
      type: this.type
    });
  }

}
