import { Injectable } from '@angular/core';
import {Person} from "../models/person";
import {HttpClient} from "@angular/common/http";
import {Universities} from "../models/universities";
import {Socialtypes} from "../models/socialtypes";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  universities!:Universities[];
  socialPages!:Socialtypes[];
  constructor(
    private http:HttpClient
  ) { }


  // @ts-ignore
  getUniversities(): Universities{
    this.http.get<Universities[]>('http://localhost:8085/universities')
      .subscribe((res: Universities[]) => {
        this.universities= res;
      });
  }

  getSocialPages(): void{
    this.http.get<Socialtypes[]>('http://localhost:8085/socialPages')
      .subscribe((res: Socialtypes[]) => {
        this.socialPages= res;
      });
  }
}
