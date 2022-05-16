import {Component, OnInit} from '@angular/core';
import {PersonRegistryService} from "./services/person-registry.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UAP cv registration';
  ngOnInit(): void {
  }
}
