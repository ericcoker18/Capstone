import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';
import { ContactService } from '../contact.service';
import { IColumn } from '../icolumn';
import { IContact } from '../icontact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  columns: IColumn[] = [
    { columnDef: "firstName", header: "First Name", cell: (element: any) => `${element.firstName}` },
    { columnDef: "lastName", header: "Last Name", cell: (element: any) => `${element.lastName}` },
    { columnDef: "emailAddress", header: "Email Address", cell: (element: any) => `${element.emailAddress}` },
    { columnDef: "primaryPhoneNumber", header: "Primary Phone Number", cell: (element: any) => `${element.primaryPhoneNumber}` },
    { columnDef: "secondaryPhoneNumber", header: "Secondary Phone Number", cell: (element: any) => `${element.secondaryPhoneNumber}` },
    { columnDef: "address", header: "Address", cell: (element: any) => `${element.address}` },
    { columnDef: "type", header: "Type", cell: (element: any) => `${element.type}` }
    


  ]
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource: MatTableDataSource<IContact>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private contactService: ContactService) {

  }
  async ngOnInit() {
    await this.loadData();
    
  }

  async loadData() {
    this.dataSource = new MatTableDataSource<IContact>(await this.contactService.getContacts())
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
}
