import {Document} from "./document";

export class Person {
  id!: number;
  name?: string;
  surname?: string;
  fathername?: string;
  militarystate?: boolean;
  status?: number;
  insertdate?: Date;
  fin?: string;
  email?: string;
  address?:string;
  phoneNumber?:string;
  idcv?:Document;
}
