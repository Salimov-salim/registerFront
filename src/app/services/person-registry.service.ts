import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Person} from "../models/person";
import {catchError, map, Observable} from "rxjs";
import {Ress} from "../models/ress";

@Injectable({
  providedIn: 'root'
})
export class PersonRegistryService {

  persons!: Person[];
  filteredPersons!:Person[];



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


  addPerson(person: Person): Observable<any> {
    return this.http.post(this.apiUrl + '/person', person);
  }

  updatePerson(person: Person, personID: number): Observable<any> {
    return this.http.put(this.apiUrl + '/person/' + personID, person);
  }

  deletePerson(personId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/person/' + personId);
  }


}
