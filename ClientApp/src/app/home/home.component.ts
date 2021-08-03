import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ContactService} from '../contact.service';
import {IColumn} from '../icolumn';
import {IContact} from '../icontact';
import {ContactTypes} from "../contact-types";
import {AuthorizeService} from "../../api-authorization/authorize.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  columns: IColumn[] = [
    {columnDef: "firstName", header: "First Name", cell: (element: any) => `${element.firstName}`},
    {columnDef: "lastName", header: "Last Name", cell: (element: any) => `${element.lastName}`},
    {columnDef: "emailAddress", header: "Email Address", cell: (element: any) => `${element.emailAddress}`},
    {columnDef: "address", header: "Address", cell: (element: any) => `${element.address}`},
    {columnDef: "type", header: "Type", cell: (element: any) =>  {
      const types = ContactTypes.getContactTypes();
      return `${types[element.type].caption}`
      }}


  ]
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource: MatTableDataSource<IContact>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  isAuthenticated = false;
  constructor(private contactService: ContactService, private authorize: AuthorizeService) {
    this.displayedColumns.unshift('id')
    this.displayedColumns.push('actions');
  }

  async ngOnInit() {
    await this.loadData();
    this.isAuthenticated = await this.authorize.isAuthenticated().pipe(take(1)).toPromise();
  }

  async loadData() {
    this.dataSource = new MatTableDataSource<IContact>(await this.contactService.getContacts())
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  async delete(id: number) {
    const contact = await this.contactService.getContact(id);
    await this.contactService.deleteContact(contact);
    await this.loadData();
  }

  filterTable(value: string) {
    this.dataSource.filter = value;
  }
}
