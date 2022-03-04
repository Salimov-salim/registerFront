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



  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http:HttpClient
  ) { }


  getPersons(): void {
    this.http.get<Person[]>('http://localhost:8085/persons').subscribe((res:Person[])=>{
      console.log(res)
      this.persons = res;
    })

  }
  // getCards(): void {
  //   this.http.get<Ress>('http://localhost:8085/persons')
  //     .subscribe((res: Ress) => {
  //       this.ress = res;
  //     });
  // }

  addCard(card: Person): Observable<any> {
    return this.http.post(this.apiUrl + '/cards', card);
  }

  updateCard(card: Person, cardId: number): Observable<any> {
    return this.http.put(this.apiUrl + '/cards/' + cardId, card);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/cards/' + cardId);
  }

  getPerson(): void {
    this.http.get<Person>('http://localhost:8085/persons/1')
      .subscribe((res: Person) => {
        return res;
      });
  }

  getPersonByID(): Observable<Person>{
    return this.http.get<Person>("http://localhost:8085/persons/2");
  };

}
