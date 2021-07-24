export class ContactTypes {
  static readonly PERSONAL = 0;
  static readonly WORK = 1;
  static readonly OTHER = 2;

  public static contactTypes: any[] = [
    {typeValue: ContactTypes.PERSONAL, caption: 'Personal'},
    {typeValue: ContactTypes.WORK, caption: 'Work'},
    {typeValue: ContactTypes.OTHER, caption: 'Other'}
  ];

  public static getContactTypes(): any[] {
    return this.contactTypes;
  }
}
