import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonRegistryService} from "../../services/person-registry.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Person} from "../../models/person";
import {HelperService} from "../../services/helper.service";
import {FileUploadService} from "../../file-upload/file-upload.service";
import {Education} from "../../models/education";
import {WorkExperience} from "../../models/work-experience";
import {Personsocialnetwork} from "../../models/personsocialnetwork";
import {Document} from "../../models/document";
import {Sender} from "../../models/sender";
import {Additionalinformations} from "../../models/additionalinformations";
import {A} from "@angular/cdk/keycodes";




const MAX_SIZE: number = 2048576;

@Component({
  selector: 'app-resume-modal',
  templateUrl: './resume-modal.component.html',
  styleUrls: ['./resume-modal.component.scss']
})

export class ResumeModalComponent implements OnInit {
  selectedFiles?: FileList;
  loaded = 0;
  currentFile!: File;
  fileName!:string;
  url:any;
  sender!: Sender;
  CvDocument!: Document;

  formPerson!: Person;
  formEducation!:Education;
  formEducation2!:Education;
  formWork!:WorkExperience;
  formWork2!:WorkExperience;
  formSociality!:Personsocialnetwork;
  formSociality2!:Personsocialnetwork;
  formAdditionalInformation!:Additionalinformations;


  showSpinner: boolean = false;
  toShow : boolean = false;


  phone2:boolean=false;
  phone3:boolean=false;

  work2:boolean=false;
  work3:boolean=false;

  social2:boolean=false;
  social3:boolean=false


  constructor(
    private uploadService2: FileUploadService,
    private dialogRef: MatDialogRef<ResumeModalComponent>,
    private personService: PersonRegistryService,
    public helperService: HelperService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Person

  ) {
    this.CvDocument=new Document();
    this.formPerson=new Person();
    this.formEducation=new Education();
    this.formEducation2=new Education();
    this.formWork=new WorkExperience();
    this.formWork2=new WorkExperience();
    this.formSociality=new Personsocialnetwork();
    this.formSociality2=new Personsocialnetwork();
    this.sender=new Sender();
    this.formAdditionalInformation=new Additionalinformations();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.formPerson = {
      name: this.data?.name || '',
      surname:this.data?.surname || '',
      militarystate: this.data?.militarystate || false,
      fathername:this.data?.fathername || '',
      email: this.data?.email || '',
      address: this.data?.address || '',
      phoneNumber:this.data?.phoneNumber || '',
    };
  }


  selectFile(event:any) {
      this.selectedFiles = event.target.files;
      // console.log( this.selectedFiles!.item(0))
      this.fileName = event.target.files[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.url = reader.result;
        console.log(this.url)
      }

      this.fileName = this.fileName.substring(0, this.fileName.lastIndexOf("."));

  }

  uploadFile(){
          this.showSpinner =true;
          let fileContent:string;
          var contentLength = (this.url.length);
          fileContent = this.url.substring(this.url.indexOf(",") + 1, contentLength);
          console.log(fileContent)
          this.CvDocument.content = fileContent;
  }

  addPerson(): void {
      this.showSpinner = true;

      this.sender.person=this.formPerson;
      this.sender.workExperience=this.formWork;
      this.sender.workExperience2=this.formWork2;
      this.sender.personEducation=this.formEducation;
      this.sender.personEducation2=this.formEducation;
      this.sender.personsocialnetworks=this.formSociality;
      this.sender.personsocialnetworks2=this.formSociality2;
      this.sender.cv=this.CvDocument;
      this.sender.additionalinformation=this.formAdditionalInformation;
      this.personService.addPerson(this.sender)
        .subscribe((res: any) => {
          console.log(res)
          this.getSuccess(res + 'Şəxs haqqında məlumat uğurla əlavə olundu');
        }, (err: any) => {
          this.getError(err.message + 'Uğursuz 1');
        });
    }



  getSuccess(message: string): void {
    this.snackbarService.createSnackbar('success', message);
    this.personService.getPersons();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showSpinner = false;
  }

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

  deletePerson(){
      console.log(this.data.id);
  }

  updatePerson(): void {
    this.formPerson.id=this.data.id;
    this.sender.person=this.formPerson;
    this.sender.workExperience=this.formWork;
    this.sender.additionalinformation=this.formAdditionalInformation;
    // this.formPerson.id=this.data.id;
    this.personService.updatePerson(this.sender)
      .subscribe((res: any) => {
        console.log(res)
        this.getSuccess(res || 'Person succesfully updated.');
      }, (err: any) => {
        this.getError(err.message || 'Error happened when update person details');
      });
  }




}




// addCard(): void {
//   this.showSpinner = true;
//   this.cardService.addCard(this.personForm.value)
//     .subscribe((res: any) => {
//       this.getSuccess(res || 'Şəxs haqqında məlumat uğurla əlavə olundu');
//     }, (err: any) => {
//       this.getError(err.message || 'Uğursuz əməliyyat');
//     });
// }
