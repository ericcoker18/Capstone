import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactTypes } from '../contact-types';
import { ContactService } from '../contact.service';
import { IContact } from '../icontact';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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

  constructor(private contactservice: ContactService, private formbuilder: FormBuilder, private activatesRoute: ActivatedRoute, private router: Router) {

    this.form = this.BuildForm();
  }

  async ngOnInit() {
    const id = +this.activatesRoute.snapshot.params['id'];
    this.contact = await this.contactservice.getContact(id);
    this.firstname.setValue(this.contact.firstName);
    this.lastname.setValue(this.contact.lastName);
    this.emailaddress.setValue(this.contact.emailAddress);
    this.primaryphonenumber.setValue(this.contact.primaryPhoneNumber);
    this.secondaryphonenumber.setValue(this.contact.secondaryPhoneNumber);
    this.address.setValue(this.contact.address);
    this.type.setValue(this.contact.type);

    console.log(this.contact);
    console.log(id);
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
  
  async Update(): Promise<void> {
    const newcontact: IContact = {
      id: this.contact.id,
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      emailAddress: this.emailaddress.value,
      primaryPhoneNumber: this.primaryphonenumber.value,
      secondaryPhoneNumber: this.secondaryphonenumber.value,
      address: this.address.value,
      type: this.type.value
    }

    try {
      const contact = await this.contactservice.editContact(newcontact);
      this.router.navigate(['/']);
    }
    catch (err) {
      console.log(err);
    }
  } 
} 
