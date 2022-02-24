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

  loaded = 0;
  selectedFiles!: FileList;
  currentFileUpload!: File;

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  // Uploads the file to backend server.
  // upload() {
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.fileService.uploadSingleFile(this.currentFileUpload)
  //     .pipe(tap(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.loaded = Math.round(100 * event.loaded / event.total);
  //       }
  //     })).subscribe(event => {
  //     if (event instanceof HttpResponse) {
  //       this.snackBar.open('File uploaded successfully!', 'Close', {
  //         duration: 3000
  //       });
  //       this.fileService.fetchFileNames();
  //     }
  //   });
  // }


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
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.name || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.email || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.fin || '', Validators.maxLength(255)],
    });
  }

  testForm = new FormGroup({
    food: new FormControl('', Validators.required),
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
        this.getSuccess(res || 'Kartvizit başarıyla eklendi.');
      }, (err: any) => {
        this.getError(err.message || 'Kartvizit eklenirken bir sorun oluştu');
      });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.personForm.value, this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Kartvizit başarıyla güncellendi.');
      }, (err: any) => {
        this.getError(err.message || 'Kartvizit güncellenirken bir sorun oluştu');
      });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || 'Kartvizit başarıyla silindi.');
      }, (err: any) => {
        this.getError(err.message || 'Kartvizit silinirken bir sorun oluştu');
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
