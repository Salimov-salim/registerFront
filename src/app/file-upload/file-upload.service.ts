import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileToUpload } from './file-to-upload';
import {Universities} from "../models/universities";

const API_URL = "http://localhost:5000/api/FileUpload/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(theFile: FileToUpload) : Observable<any> {
    // return this.http.post<FileToUpload>(API_URL, theFile, httpOptions);
    return this.http.get<Universities[]>('http://localhost:8085/universities');
  }

}
