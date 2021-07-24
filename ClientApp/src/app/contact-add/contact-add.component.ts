import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { IContact } from '../icontact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  firstname: FormControl;
  lastname: FormControl;
  emailaddress: FormControl;
  primaryphonenumber: FormControl;
  secondaryphonenumber: FormControl;
  address: FormControl;
  type: FormControl;

  form: FormGroup;

  constructor(private contactservice: ContactService, private formbuilder: FormBuilder) {

  this.form = this.BuildForm();}

  ngOnInit() {
  }

  BuildForm(): FormGroup {
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.emailaddress = new FormControl('', Validators.required);
    this.primaryphonenumber = new FormControl('', Validators.required);
    this.secondaryphonenumber = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.type = new FormControl(0 , Validators.required);

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

  Save(): void {
    const newcontact: IContact = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      emailAddress: this.emailaddress.value,
      primaryPhoneNumber: this.primaryphonenumber.value,
      secondaryPhoneNumber: this.secondaryphonenumber.value,
      address: this.address.value,
      type: this.type.value
    }
    const contact = this.contactservice.addContact(newcontact);
    console.log(contact);
  }

}
