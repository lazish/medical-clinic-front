import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from './models/file';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "https://localhost:7144/api/File/"
  constructor(private http:HttpClient) { }

  uploadImage(file: FileUpload){
    let formData = new FormData()
    formData.append("file",file.file);
    formData.append("userId",String(file.userId));
    return this.http.post<Result>(`${this.baseUrl}uploadImage`,formData)
  }

  uploadDocument(file: FileUpload){
    let formData = new FormData()
    formData.append("file",file.file);
    formData.append("userId",String(file.userId));
    return this.http.post<Result>(`${this.baseUrl}uploadDocument`,formData)
  }
}
