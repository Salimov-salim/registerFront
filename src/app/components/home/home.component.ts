import { Component, OnInit } from '@angular/core';
import {PersonRegistryService} from "../../services/person-registry.service";
import {DomSanitizer} from "@angular/platform-browser";





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  library:any;
  constructor(
    public personService:PersonRegistryService
  ) {

  }


  ngOnInit(): void {
    this.personService.getMapFromElgun();
  }

}
