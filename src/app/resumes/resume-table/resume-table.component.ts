import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../models/person";
import {ResumeModalComponent} from "../resume-modal/resume-modal.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-resume-table',
  templateUrl: './resume-table.component.html',
  styleUrls: ['./resume-table.component.scss']
})
export class ResumeTableComponent implements OnInit {

  @Input() persons!:Person[]
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openUpdateCardModal(person1: Person): void {
    this.dialog.open(ResumeModalComponent, {
      data: person1
    });
  }

}
