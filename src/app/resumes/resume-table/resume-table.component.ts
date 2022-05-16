import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../models/person";
import {ResumeModalComponent} from "../resume-modal/resume-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {PersonRegistryService} from "../../services/person-registry.service";
import {Document} from "../../models/document";

import * as fileSaver from 'file-saver';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-resume-table',
  templateUrl: './resume-table.component.html',
  styleUrls: ['./resume-table.component.scss']
})
export class ResumeTableComponent implements OnInit {

  @Input() persons!:Person[]

  constructor(
    private _http:HttpClient,
    private dialog: MatDialog,
    private personRegistryService :PersonRegistryService,
  ) {}

  ngOnInit(): void {}

  openUpdateCardModal(person1: Person): void {
    this.dialog.open(ResumeModalComponent, {
      data: person1
    });
  }

  deletePerson(person:Person){
    console.log(person.id);
    this.personRegistryService.deletePerson(person.id);
    this.personRegistryService.getPersons();
  }

  downloadCV(file :Person){
    // console.log(file)
    this.downloadFile(file.idcv!.content).subscribe(response => {
      console.log(response)
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, file.name+''+file.surname+''+file.fathername+".pdf");
    })
  }

  downloadFile(content:string){
    // console.log(content)
    let s ='data:application/pdf;base64,'+content
    return this._http.get(s, {responseType: 'blob'});
  }
}
