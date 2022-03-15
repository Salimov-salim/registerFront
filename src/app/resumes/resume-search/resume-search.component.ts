import { Component, OnInit } from '@angular/core';
import {PersonRegistryService} from "../../services/person-registry.service";

@Component({
  selector: 'app-resume-search',
  templateUrl: './resume-search.component.html',
  styleUrls: ['./resume-search.component.scss']
})
export class ResumeSearchComponent implements OnInit {

  constructor(
    private personService: PersonRegistryService
  ) { }

  ngOnInit(): void {
  }

  search(searchText: string): void {

    searchText = searchText.toLowerCase();
    this.personService.filteredPersons = this.personService.persons.filter((person) => {
      return person.name.toLowerCase().indexOf(searchText) > -1 || (person.name && person.name.toLowerCase().indexOf(searchText) > -1);
    });
    // this.personService.filteredPersons = this.personService.persons.filter((person) => {
    //   return person.name.toLowerCase().indexOf(searchText) > -1 || (person.name && person.name.toLowerCase().indexOf(searchText) > -1);
    // });
  }
}
