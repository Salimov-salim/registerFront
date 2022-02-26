import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonRegistryService} from "../../services/person-registry.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../services/snackbar.service";
import {Person} from "../../models/person";

@Component({
  selector: 'app-resume-modal',
  templateUrl: './resume-modal.component.html',
  styleUrls: ['./resume-modal.component.scss']
})
export class ResumeModalComponent implements OnInit {
  personForm!: FormGroup;
  showSpinner: boolean = false;

  foods=['Orta','Bakalavr','Magistr','Doktorantura','Aspirantura'];
  universities=['adnsu','bdu','atu'];
  toShow:boolean=false;
  // selectFile(event:any) {
  //   this.selectedFiles = event.target.files;
  // }
  //

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(
    private dialogRef: MatDialogRef<ResumeModalComponent>,
    private fb: FormBuilder,
    private cardService: PersonRegistryService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,

    @Inject(MAT_DIALOG_DATA) public data: Person
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.personForm = this.fb.group({
      // name: [this.data?.name || '', Validators.maxLength(50)],
      name: [this.data?.name || '', [Validators.required, Validators.maxLength(255)]],
      surname: [this.data?.surname || '', [Validators.required, Validators.maxLength(255)]],
      fathername: [this.data?.fathername || '', [Validators.required, Validators.maxLength(255)]],
      military: [this.data?.militarystate || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.email || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.fin || '', Validators.maxLength(255)],
    });
  }

  workForm = new FormGroup({
    educationLevel: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  personalForm = new FormGroup({
    last_work: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  });




  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.personForm.value)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Şəxs haqqında məlumat uğurla əlavə olundu');
      }, (err: any) => {
        this.getError(err.message || 'Uğursuz əməliyyat');
      });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.personForm.value, this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Şəxs haqqında məlumat uğurla dəyişdirildi');
      }, (err: any) => {
        this.getError(err.message || 'Uğursuz əməliyyat');
      });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Şəxs haqqında məlumat uğurla silindi');
      }, (err: any) => {
        this.getError(err.message || 'Uğursuz əməliyyat');
      });
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackbar('success', message);
    this.cardService.getPersons();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showSpinner = false;
  }

}
