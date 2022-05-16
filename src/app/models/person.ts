import {Document} from "./document";

export class Person {
  id!: number;
  name?: string;
  surname?: string;
  fathername?: string;
  militarystate?: boolean;
  status?: boolean;
  insertdate?: Date;
  fin?: string;
  email?: string;
  address?:string;
  phonenumber?:string;
  idcv?:Document;
}
