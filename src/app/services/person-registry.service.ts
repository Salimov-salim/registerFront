import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "../models/person";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonRegistryService {

  persons!: Person[];
  filteredPersons!: Person[];


  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http:HttpClient
  ) { }

  getCards(): void {
    this.http.get<Person[]>(this.apiUrl + '/cards')
      .subscribe((res: Person[]) => {
        this.persons = this.filteredPersons = res;
      });
  }

  addCard(card: Person): Observable<any> {
    return this.http.post(this.apiUrl + '/cards', card);
  }

  updateCard(card: Person, cardId: number): Observable<any> {
    return this.http.put(this.apiUrl + '/cards/' + cardId, card);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/cards/' + cardId);
  }
}
