
import { CommonModule } from '@angular/common';

import { ResumesRoutingModule } from './resumes-routing.module';
import { ResumesComponent } from './resumes.component';
import { ResumeItemComponent } from './resume-item/resume-item.component';
import { ResumeModalComponent } from './resume-modal/resume-modal.component';
import { ResumeSearchComponent } from './resume-search/resume-search.component';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { ResumeTableComponent } from './resume-table/resume-table.component';
import {MatTableModule} from '@angular/material/table';
import {ArchwizardModule} from 'angular-archwizard';
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [
    ResumesComponent,
    ResumeItemComponent,
    ResumeModalComponent,
    ResumeSearchComponent,
    ResumeTableComponent,

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    ResumesRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatTableModule,
    //  ------
    ArchwizardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule


  ]
})
export class ResumesModule {

}
