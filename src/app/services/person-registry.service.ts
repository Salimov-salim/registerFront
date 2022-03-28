import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Person} from "../models/person";
import {catchError, map, Observable} from "rxjs";
import {Ress} from "../models/ress";
import {Sender} from "../models/sender";
import {Document} from "../models/document";

@Injectable({
  providedIn: 'root'
})
export class PersonRegistryService {

  persons!: Person[];
  filteredPersons!:Person[];
  cv!:Document;


  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http:HttpClient
  ) { }


  getPersons(): void {
    this.http.get<Person[]>('http://localhost:8085/persons').subscribe((res:Person[])=>{
      console.log(res)
      this.persons = this.filteredPersons =res;
    })

  }

  getCV():void{
    this.http.get<Document>('http://localhost:8085/cv').subscribe((res:Document)=>{
      console.log(res)
      this.cv= res;
    })

  }

  addPerson(OBJ: Sender): Observable<any> {
    return this.http.post('http://localhost:8085/addPerson', OBJ);
  }

  updatePerson(person: Sender): Observable<any> {
    return this.http.post(this.apiUrl + '/updatePerson', person);
  }

  deletePerson(personID: number): Observable<any> {
    console.log(personID);
    return this.http.get('http://localhost:8085/deletePerson/${personID}').pipe(
      map((data) => {
        return data;
      })
    );
  }


}
