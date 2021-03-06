import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {ContactAddComponent} from "../contact-add/contact-add.component";
import {AuthorizeGuard} from "../../api-authorization/authorize.guard";
import { EditComponent } from '../edit/edit.component';

const routes: Route[] = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'addcontact', component: ContactAddComponent, canActivate: [AuthorizeGuard] },
  { path: 'editcontact/:id', component: EditComponent, canActivate: [AuthorizeGuard] }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
