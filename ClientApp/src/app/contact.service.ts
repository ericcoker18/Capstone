import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IContact} from './icontact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly URL: string;
  private readonly CONTROLLER = 'api/contacts'
  constructor(private httpClient: HttpClient, @Inject('BASE_URL')private baseUrl: string) {
    this.URL = `${this.baseUrl}${this.CONTROLLER}`
  }

  async getContacts(): Promise<IContact[]> {
    return this.httpClient.get<IContact[]>(this.URL).toPromise();
  }

  async getContact(id: number): Promise<IContact> {
    const url = `${this.URL}/${id}`;

    return this.httpClient.get<IContact>(url).toPromise();
  }

  async addContact(contact: IContact): Promise<IContact> {
    return this.httpClient.post<IContact>(this.URL, contact).toPromise();
  }

  async editContact(contact: IContact): Promise<IContact> {
    return this.httpClient.put<IContact>(this.URL, contact).toPromise();
  }

  async deleteContact(contact: IContact): Promise<IContact> {
    const url = `${this.URL}/${contact.id}`;

    return this.httpClient.delete<IContact>(this.URL).toPromise();
  }
}
