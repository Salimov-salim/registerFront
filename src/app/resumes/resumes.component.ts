import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PersonRegistryService} from "../services/person-registry.service";
import {ResumeModalComponent} from "./resume-modal/resume-modal.component";

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})
export class ResumesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public personRegistryService: PersonRegistryService
  ) { }

  ngOnInit(): void {
    this.personRegistryService.getCards();
  }

  openAddCardModal(): void {
    this.dialog.open(ResumeModalComponent, {
      width: '400px'
    });
  }
}
