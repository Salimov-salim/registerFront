import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    ResumesComponent,
    ResumeItemComponent,
    ResumeModalComponent,
    ResumeSearchComponent
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
    MatFormFieldModule
  ]
})
export class ResumesModule { }
