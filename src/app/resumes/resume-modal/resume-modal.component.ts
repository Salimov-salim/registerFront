import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonRegistryService} from "../../services/person-registry.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Person} from "../../models/person";
import {HelperService} from "../../services/helper.service";
import {FileUploadService} from "../../file-upload/file-upload.service";
import {FileToUpload} from "../../file-upload/file-to-upload";
import {Education} from "../../models/education";
import {WorkExperience} from "../../models/work-experience";
import {Cv} from "../../models/cv";
import {Personsocialnetwork} from "../../models/personsocialnetwork";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {tap} from "rxjs";




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


  formPerson!: Person;
  formEducation!:Education;
  formEducation2!:Education;
  formWork!:WorkExperience;
  formWork2!:WorkExperience;
  formSociality!:Personsocialnetwork;
  formSociality2!:Personsocialnetwork;
  formCV!:Cv;


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
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    this.formPerson = {
      name: [this.data?.name || ''],
      surname:[this.data?.surname || ''],
      militarystate: [this.data?.militarystate|| ''],
      fathername:[this.data?.fathername || ''],
      email: [this.data?.email || ''],
      address: [this.data?.address || ''],
      phoneNumber:[this.data?.phoneNumber || ''],
    };
    // @ts-ignore
    this.formEducation = {
      ideducation: '',
      iduniversity:'',
    };
    // @ts-ignore
    this.formEducation2 = {
      ideducation: '',
      iduniversity:'',
    };
    // @ts-ignore
    this.formWork={
      workPlace:'',
      position:'',
      startdate:'',
      enddate:''
    };
    // @ts-ignore
    this.formWork2={
      workPlace:'',
      position:'',
      startdate:'',
      enddate:''
    };
    // @ts-ignore
    this.formSociality={
      name:'',
      url:'',
      idsocialpage:0,
    };
    // @ts-ignore
    this.formSociality2={
      name:'',
      url:'',
      idsocialpage:0,
    };

    // @ts-ignore
    this.formCV={
      content:''
    }
  }

 write(){
    console.log("Salam");
 }

  selectFile(event:any) {

    if(event.target.files[0].size > 5242880 ){
      this.getError('DİQQƏT !!! File ölçüsü 5MB-dan artıq olmamalıdır !')
    }else{
      this.selectedFiles = event.target.files;
      // console.log( this.selectedFiles!.item(0))
      this.fileName = event.target.files[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.url = reader.result;
      }
      let lenOfName = this.fileName.length;
      this.fileName = this.fileName.substring(0, this.fileName.lastIndexOf("."));
    }
  }

  uploadFile(modal){
      if(this.url != null){
          this.showSpinner =true;

          let fileContent:string;
          var contentLength = (this.url.length);
          fileContent = this.url.substring(this.url.indexOf(",") + 1, contentLength);
          this._responseTargetCase.targetCase.idUser.iduserimage = null;
          this.targetCase_TcDocument.documentname = this.fileName;
          this.targetCase_TcDocument.docextension = this.fileExtension;
          this.targetCase_TcDocument.idtargetcase = this._responseTargetCase.targetCase;
          this.targetCase_TcDocument.idtcdocument.content = fileContent;
          this.targetCaseService.saveTargetCaseTcDocument(this.targetCase_TcDocument).subscribe(
            (data)=>{
              if (data.message == null) {
                this.showDocComp = true;
                data.fileExtIcon = this.setFileIcon(data.docextension);
                data.fileSize = this.fileSizeMaker(data.fileSize);
                data.idtcdocument.content = this.setFilePrefix(data.docextension) + data.idtcdocument.content;
                this._responseTargetCase.targetcaseTcdocumentList.unshift(data);
                this.resetFileInput();
                this.successSwal('UĞURLU','');
              }else{
                this.warningSwal('DİQQƏT !', data.message);
              }
              this.showSpinner =false;
            }, (error) => {
              this.showSpinner = false;
            }, ()=>{}
          );
          modal.hide();

      }else{
        modal.hide();
        this.getError("Mütləq file seçilməlidir!!!");
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


  // upload() {
  //   // @ts-ignore
  //   this.currentFile = this.selectedFiles!.item(0);
  //   this.fileService.uploadSingleFile(this.currentFile)
  //     .pipe(tap(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.loaded = Math.round(100 * event.loaded / event.total);
  //       }
  //     })).subscribe(event => {
  //     if (event instanceof HttpResponse) {
  //
  //       this.fileService.fetchFileNames();
  //     }
  //   });
  // }


//  ------------------------

  theFile: any = null;
  messages: string[] = [];

  // private readAndUploadFile(theFile: any) {
  //   let file = new FileToUpload();
  //
  //   // Set File Information
  //   file.fileName = theFile.name;
  //   file.fileSize = theFile.size;
  //   file.fileType = theFile.type;
  //   file.lastModifiedTime = theFile.lastModified;
  //   file.lastModifiedDate = theFile.lastModifiedDate;
  //
  //   // Use FileReader() object to get file to upload
  //   // NOTE: FileReader only works with newer browsers
  //   let reader= new FileReader();
  //
  //   // Setup onload event for reader
  //   reader.onload = () => {
  //     // Store base64 encoded representation of file
  //     file.fileAsBase64 = reader.result!.toString();
  //
  //     // POST to server
  //     this.uploadService2.uploadFile(file).subscribe(resp => {
  //       this.messages.push("Upload complete"); });
  //   }
  //
  //   // Read the file
  //   reader.readAsDataURL(theFile);
  // }

  onFileChange(event:any) {
    this.theFile = null;
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
      }
    }
  }

  // uploadFile(): void {
  //   this.readAndUploadFile(this.theFile);
  // }

}
