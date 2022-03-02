import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonRegistryService} from "../../services/person-registry.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../services/snackbar.service";
import {Person} from "../../models/person";
import {HelperService} from "../../services/helper.service";
import {Universities} from "../../models/universities";
import {tap} from "rxjs";
import {FileService} from "../../services/file.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";




@Component({
  selector: 'app-resume-modal',
  templateUrl: './resume-modal.component.html',
  styleUrls: ['./resume-modal.component.scss']
})
export class ResumeModalComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';

  personForm!: FormGroup;
  showSpinner: boolean = false;
  public isSubmit: boolean;

  educationLevel=['Orta','Bakalavr','Magistr','Doktorantura','Aspirantura'];
  universities=this.helperService.universities;
  socialPages=this.helperService.socialPages;
  toShow:boolean=false;


  phone2:boolean=false;
  phone3:boolean=false;

  work2:boolean=false;
  work3:boolean=false;

  social2:boolean=false;
  social3:boolean=false


  constructor(

    private snackBar: MatSnackBar,
    private uploadService: FileService,
    private dialogRef: MatDialogRef<ResumeModalComponent>,
    private fb: FormBuilder,
    private cardService: PersonRegistryService,
    public helperService: HelperService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,

    @Inject(MAT_DIALOG_DATA) public data: Person
  ) { this.isSubmit = false;}

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


  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

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




//  ---------------------------
  newPhone(){
    if(this.phone2==true && !this.phone3){
      this.phone3=true;
    }else{
      this.phone2=true;
    }
  }
  newWork(){
    if(this.work2==true && !this.work3){
      this.work3=true;
    }else{
      this.work2=true;
    }
  }

  closeWork(workType:number){
    if(workType==2){
      this.work2=false;
    }else if(workType==3){
      this.work3=false;
    }
  }

  newSocialPage(){
    if(this.social2==true && !this.social2){
      this.social3=true;
    }else {
      this.social2=true;
    }
  }

}
