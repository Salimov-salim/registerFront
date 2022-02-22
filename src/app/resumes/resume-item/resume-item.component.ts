import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../models/person";
import {MatDialog} from "@angular/material/dialog";
import {ResumeModalComponent} from "../resume-modal/resume-modal.component";
import {Ress} from "../../models/ress";

@Component({
  selector: 'app-resume-item',
  templateUrl: './resume-item.component.html',
  styleUrls: ['./resume-item.component.scss']
})
export class ResumeItemComponent implements OnInit {


  @Input() person!: Person;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openUpdateCardModal(person1: Person): void {
    this.dialog.open(ResumeModalComponent, {
      width: '400px',
      data: person1
    });
  }



}
